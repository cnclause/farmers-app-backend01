const knex = require('../db/knex')

module.exports = {
    async getOne(id){
        return await knex('users').where('id', id).first()
    },
    async findByEmail(email){
        user = await knex('users').where('email', email).first() 
        return user
    },
    async addUser(user){
        console.log("addin da user")
        return await knex('users').insert(user, '*')
    },
    async findOrCreate(userProfile){
        const email = userProfile.email
        const user = await this.findByEmail(email)

        if(!user){
            await this.addUser(userProfile)
        } else {
            return user
        }
    }
}