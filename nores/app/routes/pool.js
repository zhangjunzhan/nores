var mysql = require('mysql');
var pool = mysql.createPool({
	host:'192.168.8.100',
	user:'root',
	password:'root',
	database:'618'
})
module.exports = {
	conn(json){
		pool.getConnection(function(err,connection){
			if(err){
				console.log('connection::::'+err);
				json.error(err)
				return
			}
			connection.query(json.sql,json.arr,(err,data)=>{
				if(err){
					console.log('connection::::'+err);
					json.error(err)
					return
				}
				connection.release();
				json.success(data)
			})
		})
	}
}