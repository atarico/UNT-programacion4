# Patrón Repository

## Introducción al Patrón Repository

El **Patrón Repository** es un patrón de diseño que encapsula la lógica de acceso a datos y proporciona una interfaz más orientada a objetos para acceder a la capa de datos. Las aplicaciones ASP.NET Core implementan sistemas de repositorios que abstraen las operaciones de base de datos y facilitan el testing y mantenimiento del código.

## Conceptos Fundamentales

### 🏗️ **Repository Pattern**

El patrón Repository actúa como una capa de abstracción entre la lógica de negocio y la capa de acceso a datos. Proporciona una interfaz uniforme para acceder a diferentes fuentes de datos sin que el código cliente sepa los detalles de implementación.

### 🎯 **Beneficios del Patrón Repository**

1. **Abstracción**: Oculta la complejidad de acceso a datos
2. **Testabilidad**: Facilita el testing con mocks
3. **Mantenibilidad**: Centraliza la lógica de acceso a datos
4. **Flexibilidad**: Permite cambiar implementaciones fácilmente
5. **Reutilización**: Código reutilizable para operaciones comunes

## Arquitectura del Patrón Repository

### 🔄 **Flujo de Datos**

![Repositorio](02-backend/img/05-repository.jpg)

### 🏛️ **Estructura de Repositorios**

```
Repositories/
├── Repository.cs          # Repositorio genérico base
├── UserRepository.cs      # Repositorio específico de usuarios
└── RoleRepository.cs      # Repositorio específico de roles
```

## Implementación del Patrón Repository

### 🔧 **Repositorio Genérico Base**

```csharp
public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null);
    Task<T> GetOneAsync(Expression<Func<T, bool>>? filter = null);
    Task CreateOneAsync(T entity);
    Task UpdateOneAsync(T entity);
    Task DeleteOneAsync(T entity);
    Task SaveAsync();
}

public class Repository<T> : IRepository<T> where T : class
{
    private readonly ApplicationDbContext _db;
    internal DbSet<T> dbSet { get; set; } = null!;

    public Repository(ApplicationDbContext db)
    {
        _db = db;
        dbSet = _db.Set<T>();
    }

    public async Task CreateOneAsync(T entity)
    {
        await dbSet.AddAsync(entity);
        await SaveAsync();
    }

    public async Task DeleteOneAsync(T entity)
    {
        dbSet.Remove(entity);
        await SaveAsync();
    }

    public async Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null)
    {
        IQueryable<T> query = dbSet;
        if (filter != null) {
            query = query.Where(filter);
        }
        return await query.ToListAsync();
    }

    public async Task<T> GetOneAsync(Expression<Func<T, bool>>? filter = null)
    {
        IQueryable<T> query = dbSet;
        if (filter != null)
        {
            query = query.Where(filter);
        }
        return await query.FirstOrDefaultAsync();
    }

    public async Task UpdateOneAsync(T entity)
    {
        dbSet.Update(entity);
        await SaveAsync();
    }

    public async Task SaveAsync()
    {
        await _db.SaveChangesAsync();
    }
}
```

##### Aclaraciones con los tipos de datos IEnumerable y IQueryable

- IEnumerable: Es una interfaz que representa una colección de elementos. Es una interfaz genérica que funciona con cualquier tipo de datos.
- IQueryable: Es una interfaz que representa una consulta a una base de datos. Es una interfaz genérica que funciona con cualquier tipo de datos.

#### **Características del Repositorio Genérico:**

- **Generic Type**: Funciona con cualquier entidad
- **Async Operations**: Todas las operaciones son asíncronas
- **Expression Filters**: Filtros usando expresiones LINQ
- **CRUD Operations**: Operaciones básicas de base de datos
- **Save Changes**: Control explícito de guardado

### 👤 **UserRepository - Repositorio Específico**

```csharp
public interface IUserRepository : IRepository<User> { }

public class UserRepository : Repository<User>, IUserRepository
{
    private readonly ApplicationDbContext _db;

    public UserRepository(ApplicationDbContext db) : base(db) {
        _db = db;
    }

    public async Task<User> GetOneByEmailOrUsername(string email, string username)
    {
        IQueryable<User> query = dbSet;
        if (filter != null)
        {
            query = query.Where(filter).Include(x => x.Roles);
        }
        return await query.FirstOrDefaultAsync();
    }
}
```

#### **Características de UserRepository:**

- **Herencia**: Extiende el repositorio genérico
- **Métodos Específicos**: Operaciones específicas de usuarios
- **Include**: Carga relacionada de roles
- **Filtros Personalizados**: Consultas específicas del dominio

### 🛡️ **RoleRepository - Repositorio de Roles**

```csharp
public interface IRoleRepository : IRepository<Role> { }

public class RoleRepository : Repository<Role>, IRoleRepository
{
    private readonly ApplicationDbContext _db;

    public RoleRepository(ApplicationDbContext db) : base(db) {
        _db = db;
    }
}
```

#### **Características de RoleRepository:**

- **Simplicidad**: Usa solo operaciones del repositorio base
- **Especialización**: Preparado para métodos específicos de roles
- **Consistencia**: Mantiene la misma interfaz que otros repositorios

## Operaciones del Repositorio

### 📖 **Operaciones de Lectura**

#### **Obtener Todos los Registros**

```csharp
// Obtener todos los usuarios
var users = await _userRepository.GetAllAsync();

// Obtener usuarios con filtro
var activeUsers = await _userRepository.GetAllAsync(u => u.IsActive);
```

#### **Obtener un Registro**

```csharp
// Obtener usuario por ID
var user = await _userRepository.GetOneAsync(u => u.Id == userId);

// Obtener usuario por email
var user = await _userRepository.GetOneAsync(u => u.Email == email);
```

### ✏️ **Operaciones de Escritura**

#### **Crear Registro**

```csharp
public async Task<User> CreateUserAsync(User user)
{
    await _userRepository.CreateOneAsync(user);
    return user;
}
```

#### **Actualizar Registro**

```csharp
public async Task<User> UpdateUserAsync(User user)
{
    await _userRepository.UpdateOneAsync(user);
    return user;
}
```

#### **Eliminar Registro**

```csharp
public async Task DeleteUserAsync(User user)
{
    await _userRepository.DeleteOneAsync(user);
}
```

### 🔍 **Consultas Avanzadas**

#### **Consultas con Include**

```csharp
public async Task<User> GetUserWithRolesAsync(int userId)
{
    return await _userRepository.GetOneAsync(
        u => u.Id == userId,
        include: u => u.Roles
    );
}
```

#### **Consultas con Filtros Complejos**

```csharp
public async Task<IEnumerable<User>> GetUsersByRoleAsync(string roleName)
{
    return await _userRepository.GetAllAsync(
        u => u.Roles.Any(r => r.Name == roleName)
    );
}
```

## Configuración e Inyección de Dependencias

### 🔧 **Registro de Repositorios**

```csharp
// En Program.cs
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
```

### 🏗️ **Resolución de Dependencias**

```csharp
public class UserServices
{
    private readonly IUserRepository _userRepository;
    private readonly IRoleRepository _roleRepository;

    public UserServices(
        IUserRepository userRepository,
        IRoleRepository roleRepository)
    {
        _userRepository = userRepository;
        _roleRepository = roleRepository;
    }

    public async Task<User> GetUserAsync(int userId)
    {
        return await _userRepository.GetOneAsync(u => u.Id == userId);
    }
}
```

## Ventajas del Patrón Repository

### ✅ **Beneficios**

1. **Abstracción**: Oculta la complejidad de acceso a datos
2. **Testabilidad**: Fácil mockear para testing
3. **Mantenibilidad**: Código organizado y mantenible
4. **Reutilización**: Operaciones comunes reutilizables
5. **Flexibilidad**: Cambiar implementaciones sin afectar clientes
6. **Consistencia**: Interfaz uniforme para todas las entidades

### 🧪 **Testing con Repositorios**

```csharp
[Test]
public async Task GetUser_WithValidId_ReturnsUser()
{
    // Arrange
    var mockRepository = new Mock<IUserRepository>();
    var expectedUser = new User { Id = 1, UserName = "test" };
    mockRepository.Setup(r => r.GetOneAsync(It.IsAny<Expression<Func<User, bool>>>()))
                   .ReturnsAsync(expectedUser);

    var userService = new UserServices(mockRepository.Object, null);

    // Act
    var result = await userService.GetUserAsync(1);

    // Assert
    Assert.IsNotNull(result);
    Assert.AreEqual("test", result.UserName);
}
```

## Patrones Avanzados

### 🏭 **Unit of Work Pattern**

```csharp
public interface IUnitOfWork : IDisposable
{
    IUserRepository Users { get; }
    IRoleRepository Roles { get; }
    Task<int> SaveChangesAsync();
}

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    private IUserRepository _users;
    private IRoleRepository _roles;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
    }

    public IUserRepository Users => _users ??= new UserRepository(_context);
    public IRoleRepository Roles => _roles ??= new RoleRepository(_context);

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context?.Dispose();
    }
}
```

Es importante tener en cuenta que el Unit of Work es un patrón de diseño que se encarga de la transacción de la base de datos. Es decir, que si se produce un error en la transacción, se debe deshacer el cambio. Por ejemplo, si se produce un error al crear un usuario y un rol, se debe deshacer el cambio de crear el usuario y el rol.

### 🔄 **Specification Pattern**

```csharp
public interface ISpecification<T>
{
    Expression<Func<T, bool>> Criteria { get; }
    List<Expression<Func<T, object>>> Includes { get; }
}

public class UserByEmailSpecification : ISpecification<User>
{
    public UserByEmailSpecification(string email)
    {
        Criteria = u => u.Email == email;
    }

    public Expression<Func<User, bool>> Criteria { get; }
    public List<Expression<Func<T, object>>> Includes { get; } = new();
}
```

## Mejores Prácticas

### 📋 **Recomendaciones**

1. **Interfaces**: Siempre usar interfaces para repositorios
2. **Generic Types**: Usar repositorios genéricos para operaciones comunes
3. **Async/Await**: Usar operaciones asíncronas consistentemente
4. **Error Handling**: Implementar manejo robusto de errores
5. **Logging**: Registrar operaciones importantes
6. **Performance**: Optimizar consultas y evitar N+1 problems

### ⚠️ **Consideraciones**

1. **Over-engineering**: No sobre-complicar para casos simples
2. **Performance**: Considerar el impacto en rendimiento
3. **Complexity**: Balancear simplicidad vs. flexibilidad
4. **Testing**: Asegurar que los mocks sean realistas
5. **Maintenance**: Mantener repositorios actualizados

## Ejemplos de Uso Avanzado

### 🔍 **Repositorio con Paginación**

```csharp
public interface IPagedRepository<T> : IRepository<T>
{
    Task<PagedResult<T>> GetPagedAsync(int page, int pageSize, Expression<Func<T, bool>>? filter = null);
}

public class PagedResult<T>
{
    public IEnumerable<T> Data { get; set; }
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
}
```

### 🎯 **Repositorio con Caching**

```csharp
public class CachedUserRepository : IUserRepository
{
    private readonly IUserRepository _repository;
    private readonly IMemoryCache _cache;

    public CachedUserRepository(IUserRepository repository, IMemoryCache cache)
    {
        _repository = repository;
        _cache = cache;
    }

    public async Task<User> GetOneAsync(Expression<Func<User, bool>>? filter = null)
    {
        var cacheKey = $"user_{filter}";

        if (_cache.TryGetValue(cacheKey, out User cachedUser))
        {
            return cachedUser;
        }

        var user = await _repository.GetOneAsync(filter);
        _cache.Set(cacheKey, user, TimeSpan.FromMinutes(5));

        return user;
    }
}
```

### 🔄 **Repositorio con Transacciones**

```csharp
public class TransactionalUserRepository : IUserRepository
{
    private readonly IUserRepository _repository;
    private readonly ApplicationDbContext _context;

    public async Task<User> CreateUserWithRoleAsync(User user, Role role)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            await _repository.CreateOneAsync(user);
            user.Roles.Add(role);
            await _repository.UpdateOneAsync(user);

            await transaction.CommitAsync();
            return user;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}
```

## Comparación con Otros Patrones

### 🆚 **Repository vs. Active Record**

| Repository                      | Active Record               |
| ------------------------------- | --------------------------- |
| Separación de responsabilidades | Entidad con lógica de datos |
| Fácil testing                   | Testing más complejo        |
| Flexibilidad                    | Menos flexible              |
| Más código                      | Menos código                |

### 🆚 **Repository vs. DAO (Data Access Object)**

| Repository             | DAO                          |
| ---------------------- | ---------------------------- |
| Orientado a objetos    | Orientado a datos            |
| Operaciones de dominio | Operaciones de base de datos |
| Más abstracto          | Más específico               |
| Mejor para DDD         | Mejor para CRUD simple       |
