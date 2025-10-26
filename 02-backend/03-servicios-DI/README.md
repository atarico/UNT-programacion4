# Servicios e Inyección de Dependencias

## Introducción a Servicios e Inyección de Dependencias

Los **Servicios** y la **Inyección de Dependencias (DI)** son componentes fundamentales en ASP.NET Core que implementan el principio de inversión de control (IoC) y facilitan la separación de responsabilidades. Las aplicaciones ASP.NET Core implementan sistemas robustos de servicios que encapsulan la lógica de negocio y utilizan DI para mantener un código desacoplado y testeable.

## Conceptos Fundamentales

### 🏭 **Servicios (Service Layer)**

Los servicios encapsulan la lógica de negocio y coordinan las operaciones entre diferentes componentes. Actúan como intermediarios entre los controladores y los repositorios, proporcionando una capa de abstracción para la lógica de negocio.

### 💉 **Inyección de Dependencias (Dependency Injection)**

La inyección de dependencias es un patrón de diseño que implementa la inversión de control, permitiendo que las dependencias sean proporcionadas externamente en lugar de ser creadas internamente por las clases.

### 🎯 **Tipos de Servicios**

#### **1. Servicios de Negocio (Business Services)**

- **AuthServices**: Lógica de autenticación y autorización
- **UserServices**: Gestión de usuarios
- **RoleServices**: Gestión de roles

#### **2. Servicios de Utilidad (Utility Services)**

- **EncoderServices**: Encriptación y verificación de contraseñas

## Implementación de Servicios

### 🔐 **AuthServices - Servicio Principal de Autenticación**

```csharp
public class AuthServices
{
    private readonly UserServices _userServices;
    private readonly IEncoderServices _encoderServices;
    private readonly IMapper _mapper;
    private readonly IConfiguration _config;

    public AuthServices(
        UserServices userServices,
        IEncoderServices encoderServices,
        IConfiguration config,
        IMapper mapper)
    {
        _userServices = userServices;
        _encoderServices = encoderServices;
        _config = config;
        _mapper = mapper;
    }

    public async Task<UserWithoutPassDTO> Register(RegisterDTO register)
    {
        // 1. Verificar si el usuario ya existe
        var user = await _userServices.GetOneByEmailOrUsername(register.Email, register.UserName);
        if (user != null) {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "User already exists");
        }

        // 2. Crear nuevo usuario
        var created = await _userServices.CreateOne(register);
        return created;
    }

    public async Task<LoginResponseDTO> Login(LoginDTO login, HttpContext context)
    {
        // 1. Buscar usuario por email o username
        var user = await _userServices.GetOneByEmailOrUsername(login.EmailOrUsername, login.EmailOrUsername);

        if (user == null)
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "Invalid credentials");
        }

        // 2. Verificar contraseña
        bool IsMatch = _encoderServices.Verify(login.Password, user.Password);
        if (!IsMatch) {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "Invalid credentials");
        }

        // 3. Crear sesión y token
        await SetCookie(user, context);
        string token = GenerateJwt(user);

        return new LoginResponseDTO {
            Token = token,
            User = _mapper.Map<UserWithoutPassDTO>(user)
        };
    }
}
```

#### **Características de AuthServices:**

- **Coordinación**: Orquesta operaciones entre otros servicios
- **Validación**: Verifica credenciales y reglas de negocio
- **Seguridad**: Maneja tokens JWT y cookies de sesión
- **Mapeo**: Utiliza AutoMapper para transformaciones

### 👤 **UserServices - Gestión de Usuarios**

```csharp
public class UserServices
{
    private readonly IUserRepository _repo;
    private readonly IMapper _mapper;
    private readonly IEncoderServices _encoderServices;
    private readonly RoleServices _roleServices;

    public UserServices(
        IUserRepository repo,
        IMapper mapper,
        IEncoderServices encoderServices,
        RoleServices roleServices)
    {
        _repo = repo;
        _mapper = mapper;
        _encoderServices = encoderServices;
        _roleServices = roleServices;
    }

    public async Task<User> GetOneByEmailOrUsername(string? email, string? username)
    {
        if (string.IsNullOrEmpty(username) && string.IsNullOrEmpty(email))
        {
            throw new HttpResponseError(HttpStatusCode.BadRequest, "Email and Username are empty");
        }

        var user = await _repo.GetOneAsync(x => x.Email == email || x.UserName == username);
        return user;
    }

    public async Task<UserWithoutPassDTO> CreateOne(RegisterDTO register)
    {
        // 1. Mapear DTO a entidad
        var user = _mapper.Map<User>(register);

        // 2. Encriptar contraseña
        user.Password = _encoderServices.Encode(user.Password);

        // 3. Asignar rol por defecto
        var role = await _roleServices.GetOneByName(ROLE.USER);
        user.Roles = new() { role };

        // 4. Guardar en base de datos
        await _repo.CreateOneAsync(user);

        // 5. Retornar DTO sin contraseña
        return _mapper.Map<UserWithoutPassDTO>(user);
    }
}
```

#### **Características de UserServices:**

- **CRUD Operations**: Operaciones básicas de usuarios
- **Validación**: Verificación de datos de entrada
- **Seguridad**: Encriptación de contraseñas
- **Roles**: Asignación automática de roles

### 🛡️ **RoleServices - Gestión de Roles**

```csharp
public class RoleServices
{
    private readonly IRoleRepository _repo;

    public RoleServices(IRoleRepository repo)
    {
        _repo = repo;
    }

    public async Task<Role> GetOneByName(string name)
    {
        var role = await _repo.GetOneAsync(x => x.Name == name);

        if (role == null)
        {
            throw new HttpResponseError(
                HttpStatusCode.NotFound,
                $"Role with name '{name}' doesn't exist"
            );
        }

        return role;
    }
}
```

#### **Características de RoleServices:**

- **Búsqueda**: Localización de roles por nombre
- **Validación**: Verificación de existencia de roles
- **Manejo de Errores**: Excepciones descriptivas

### 🔒 **EncoderServices - Servicio de Encriptación**

```csharp
public interface IEncoderServices
{
    string Encode(string value);
    bool Verify(string value, string hash);
}

public class EncoderServices : IEncoderServices
{
    public string Encode(string value)
    {
        var salt = BC.GenerateSalt(13);
        string encoded = BC.HashPassword(value, salt);
        return encoded;
    }

    public bool Verify(string value, string hash)
    {
        bool matched = BC.Verify(value, hash);
        return matched;
    }
}
```

#### **Características de EncoderServices:**

- **BCrypt**: Algoritmo de hash seguro
- **Salt**: Generación automática de salt
- **Verificación**: Comparación segura de contraseñas
- **Interfaz**: Abstracción para testing

## Inyección de Dependencias

### 🔧 **Configuración en Program.cs**

```csharp
// Servicios de negocio
builder.Services.AddScoped<UserServices>();
builder.Services.AddScoped<AuthServices>();
builder.Services.AddScoped<RoleServices>();

// Servicios con interfaces
builder.Services.AddScoped<IEncoderServices, EncoderServices>();

// Repositorios
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();

// AutoMapper
builder.Services.AddAutoMapper(opts => { }, typeof(Mapping));

// Entity Framework
builder.Services.AddDbContext<ApplicationDbContext>(opts =>
{
    opts.UseSqlServer(builder.Configuration.GetConnectionString("authConnection"));
});
```

### 📋 **Tipos de Inyección de Dependencias**

#### **1. Scoped (Alcance por Request)**

```csharp
builder.Services.AddScoped<UserServices>();
```

- **Vida útil**: Una instancia por request HTTP
- **Uso**: Servicios que manejan estado por request
- **Ejemplo**: UserServices, AuthServices

#### **2. Singleton (Instancia Única)**

```csharp
builder.Services.AddSingleton<IConfiguration>(configuration);
```

- **Vida útil**: Una instancia para toda la aplicación
- **Uso**: Servicios sin estado, configuración
- **Ejemplo**: Configuration, Logging

#### **3. Transient (Nueva Instancia)**

```csharp
builder.Services.AddTransient<IValidator, CustomValidator>();
```

- **Vida útil**: Nueva instancia cada vez que se solicita
- **Uso**: Servicios ligeros, validadores
- **Ejemplo**: Validators, Helpers

### 🏗️ **Patrones de Inyección**

#### **Constructor Injection**

```csharp
public class AuthServices
{
    private readonly UserServices _userServices;
    private readonly IEncoderServices _encoderServices;

    public AuthServices(UserServices userServices, IEncoderServices encoderServices)
    {
        _userServices = userServices;
        _encoderServices = encoderServices;
    }
}
```

#### **Interface Segregation**

```csharp
// Interfaz específica
public interface IEncoderServices
{
    string Encode(string value);
    bool Verify(string value, string hash);
}

// Implementación
public class EncoderServices : IEncoderServices
{
    // Implementación específica
}
```

### 🎯 **Resolución de Dependencias**

```csharp
// 1. Cliente hace request
[HttpPost("login")]
public async Task<ActionResult<LoginResponseDTO>> Login([FromBody] LoginDTO login)
{
    // 2. DI Container resuelve AuthServices
    var result = await _authServices.Login(login, HttpContext);
    return Ok(result);
}

// 3. AuthServices resuelve sus dependencias
public AuthServices(UserServices userServices, IEncoderServices encoderServices, ...)
{
    // 4. UserServices resuelve sus dependencias
    // 5. Repositorios se resuelven
    // 6. Operación se ejecuta
}
```

## Ventajas de la Inyección de Dependencias

### ✅ **Beneficios**

1. **Desacoplamiento**: Componentes independientes y reutilizables
2. **Testabilidad**: Fácil mockear dependencias para testing
3. **Mantenibilidad**: Cambios en implementaciones sin afectar clientes
4. **Flexibilidad**: Fácil cambiar implementaciones
5. **Configuración**: Configuración centralizada de dependencias

### 🧪 **Testing con DI**

```csharp
// Ejemplo de test unitario
[Test]
public async Task Login_WithValidCredentials_ReturnsToken()
{
    // Arrange
    var mockUserRepo = new Mock<IUserRepository>();
    var mockEncoder = new Mock<IEncoderServices>();
    var mockMapper = new Mock<IMapper>();

    var authService = new AuthServices(
        new UserServices(mockUserRepo.Object, mockMapper.Object, mockEncoder.Object, null),
        mockEncoder.Object,
        null,
        mockMapper.Object
    );

    // Act & Assert
    // Test implementation
}
```

## Mejores Prácticas

### 📋 **Recomendaciones para Servicios**

1. **Single Responsibility**: Cada servicio una responsabilidad
2. **Interface Segregation**: Interfaces específicas y cohesivas
3. **Dependency Inversion**: Depender de abstracciones, no implementaciones
4. **Error Handling**: Manejo consistente de errores
5. **Logging**: Registrar operaciones importantes

### 📋 **Recomendaciones para DI**

1. **Constructor Injection**: Preferir inyección por constructor
2. **Interface Segregation**: Usar interfaces específicas
3. **Lifecycle Management**: Elegir el ciclo de vida apropiado
4. **Configuration**: Configurar en Program.cs o Startup
5. **Testing**: Facilitar testing con interfaces

### ⚠️ **Consideraciones**

1. **Circular Dependencies**: Evitar dependencias circulares
2. **Service Locator**: Evitar el anti-patrón Service Locator
3. **Over-injection**: No inyectar demasiadas dependencias
4. **Performance**: Considerar el impacto en rendimiento
5. **Complexity**: Balancear simplicidad vs. flexibilidad

## Ejemplos de Uso Avanzado

### 🔄 **Servicios con Estado**

```csharp
public class SessionService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public SessionService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string GetCurrentUserId()
    {
        return _httpContextAccessor.HttpContext?.User?.FindFirst("id")?.Value;
    }
}
```

### 🏭 **Factory Pattern con DI**

```csharp
public interface IUserServiceFactory
{
    UserServices CreateUserService();
}

public class UserServiceFactory : IUserServiceFactory
{
    private readonly IServiceProvider _serviceProvider;

    public UserServiceFactory(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public UserServices CreateUserService()
    {
        return _serviceProvider.GetRequiredService<UserServices>();
    }
}
```
