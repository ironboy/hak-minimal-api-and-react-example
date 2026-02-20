namespace WebApp;

public static class SpecialRoutes
{
  public static void Start()
  {

    // A simple route that just say hi (no DB lookup)
    App.MapGet("/api/say-hi/", (
          HttpContext context
      ) => Results.Text(
          "Hi there!",
          "text/plain; charset=utf-8",
          null,
          200
        )
      );

    // A route that returns all post from the animal table except snakes
    // Note: This is justa an example, the REST api supports filtering out of the box
    // http://localhost:5173/api/animals?WHERE=species!=snake
    App.MapGet("/api/animals-without-snakes", (
           HttpContext context
       ) =>
           RestResult.Parse(context, SQLQuery(
              "SELECT * FROM animals WHERE species != 'snake'"
           ))
       );

    // But We could create this special route too
    // Api.MapPost('/api/animals-without-snakes)
    // Which would only write animals to the db if their species 
    // are not 'snake' and otherwise return an error message

    // How would you accomplish this
    // (Have a look at RestApi.cs for how the database is queried
    // and we handle request bodies)

  }
}