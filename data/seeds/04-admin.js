exports.seed = function(knex) {
    return knex("admin").insert([
        {
            username: "izlix",
            password: "$2b$11$bXgBwHWKug7UOWW2gS1j6e9ShX8EDueGQw8BQRYVsWMHfDvf0eXrS"
        }
    ])
}