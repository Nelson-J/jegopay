const db = require('./db')

//entity placeholder
Entity = function(entity){
    this.id = entity.id;
    this.name = entity.name;
    this.location = entity.location;
    this.nerd = entity.nerd;
}

//placeholder to get all entities
Entity.getAll = result =>{
    const sql = 'SELECT * FROM entities';
    db.query(sql, function(err, res){
        if(err) throw err;
        console.log('Result: ', res); //comment out
        result(null,res); //attach db output to response for client
    });
}

//Other methods to go here

module.exports = Entity;