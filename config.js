const config = {
    dbUrl: process.env.DB_URL || `mongodb+srv://mjrmachacon:admin123@kuepa.df0anbl.mongodb.net/test`,
    port: process.env.PORT || 3005,
    host: process.env.HOST || "http://localhost",
}

module.exports = config;