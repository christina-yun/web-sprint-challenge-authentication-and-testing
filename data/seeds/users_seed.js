exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      return knex("users").insert([
        {
          username: "sailor_helios",
          password:
            "$2a$08$AknbpMgxonEH3R18VuvG/.gb22QPlcggnpo67ejhQMTyojm.seina",
        },
        {
          username: "christina",
          password:
            "$2a$08$kZQvSCksBAlNARi0qZAG.eaVr4c1SA9L0IPbwK3CSJD1ACsP6Ljrm",
        },
        {
          username: "taco",
          password:
            "$2a$08$b6gt5OAontbEQyM7KTjZ1Oe.EFCm.mg7k254Ek16ZwpFQcLSyUecO",
        },
      ]);
    });
};
