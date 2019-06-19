var express = require('express');
var pool = require('./pool')
var router = express.Router();
//注册
router.post('/up',(req,res) => {
	var json = req.body
	console.log(json);
	pool.conn({
		arr:[json.user],
		sql:'select user from login where user=?',
		success(data){
			if(data.length){
				res.send('账号已存在');
			}else{
				pool.conn({
					arr:[json.img,json.names,json.user,json.pass],
					sql:'insert into login(img,names,user,pass)values(?,?,?,?)',
					success(data){
						res.send('ok')
					},
					error(err){
						res.send(err)
					}
				})
			}
		},
		error(err){
			res.send(err)
		}
	})
});
//登录
router.post('/in',(req,res)=>{
	var json = req.body;
	console.log(json)
	pool.conn({
		arr:[json.user,json.pass],
		sql:'select * from login where user=? and pass=?',
		success(data){
			if(data.length){
				data[0].pass = '';
				res.send(data[0])
			}else{
				res.send('ok')

			}
		},
		error(err){
			res.send(err)
		}
	})
	// res.send('ok')
})
//创建小说
router.post('/novel',(req,res)=>{
	var json = req.body;
	console.log(json);
	pool.conn({
		arr:[json.names],
		sql:'select names from found where names=?',
		success(data){
			if(data.length){
				res.send('账号已存在');
			}else{
				// res.send('ok')
				pool.conn({
					arr:[json.img,json.names,json.texts,json.loginuid],
					sql:'insert into found(img,names,texts,loginuid)values(?,?,?,?)',
					success(data){
						res.send('ok')
					},
					error(err){
						res.send(err)
					}
				})
			}
		},
		error(err){
			res.send(err)
		}
	})
	// res.send('ok')
})
//个人中心小说大厅
router.post('/hall_l',(req,res)=>{
	var json = req.body;
	console.log(json);
	pool.conn({
		arr:[json.loginuid],
		sql:'select * from found where loginuid=?',
		success(data){
			if(data.length){
				// data[0].pass = '';
				res.send(data)
			}else{
				res.send('ok')

			}
		},
		error(err){
			res.send(err)
		}
	})
	// res.send('ok')
})
//删除
router.post('/delete_l',(req,res)=>{
	var json = req.body;
	console.log(json);
	pool.conn({
		arr:[json.uid],
		sql:'delete from found where uid=?',
		success(data){
			res.send('ok')
		},
		error(err){
			res.send(err)
		}
	})
	
})
//章节发布
router.post('/section_c',(req,res)=>{
	var json = req.body;
	console.log(json);
	pool.conn({
		arr:[json.section],
		sql:'select section from section_l where section=?',
		success(data){
			if(data.length){
				res.send('账号已存在');
			}else{
				// res.send('ok')
				pool.conn({
					arr:[json.fiction_uid,json.section,json.names,json.texts],
					sql:'insert into section_l(fiction_uid,section,names,texts)values(?,?,?,?)',
					success(data){
						res.send('ok')
					},
					error(err){
						res.send(err)
					}
				})
			}
		},
		error(err){
			res.send(err)
		}
	})
	// res.send('ok')
})
//章节大厅
router.post('/hall_c',(req,res)=>{
	var json = req.body;
	console.log(json);
	pool.conn({
		arr:[json.fiction_uid],
		sql:'select * from section_l where fiction_uid=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
	// res.send('ok')
})
//章节删除
router.post('/del_c',(req,res)=>{
	var json = req.body;
	console.log(json);
	pool.conn({
		arr:[json.uid],
		sql:'delete from section_l where uid=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
	// res.send('ok')
})
//模糊搜索
router.post('/search_i',(req,res)=>{
	var json = req.body;
	console.log(json);
	pool.conn({
		arr:[json.names],
		sql:' select * from found where names like "%"?"%"',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
	// res.send('ok')
})
//六本书
router.post('/recommend_l',(req,res)=>{
	var json = req.body;
	console.log(json);
	pool.conn({
		arr:[],
		sql:' select * from found limit 0,6',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
	// res.send('ok')
})
//章节列表
router.post('/Chapter_lists',(req,res)=>{
	var json = req.body;
	console.log(json);
	pool.conn({
		arr:[json.fiction_uid],
		sql:'select * from section_l where fiction_uid=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
	// res.send('ok')
})
//加入书架
router.post('/bookrack_d',(req,res)=>{
	var json = req.body;
	console.log(json);
	pool.conn({
		arr:[json.names,json.user],
		sql:'select * from bookrack where names=? and user=?',
		success(data){
			if(data.length){
				res.send('账号已存在');
			}else{
				// res.send('ok')
				pool.conn({
					arr:[json.img,json.names,json.author,json.texts,json.user],
					sql:'insert into bookrack(img,names,author,texts,user)values(?,?,?,?,?)',
					success(data){
						res.send('ok')
					},
					error(err){
						res.send(err)
					}
				})
			}
		},
		error(err){
			res.send(err)
		}
	})
	// res.send('ok')
})
//个人书架
router.post('/book_b',(req,res)=>{
	var json = req.body;
	console.log(json);
	pool.conn({
		arr:[json.user],
		sql:'select * from bookrack where user=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
	// res.send('ok')
})
//个人书架删除
router.post('/del_b',(req,res)=>{
	var json = req.body;
	console.log(json);
	pool.conn({
		arr:[json.uid],
		sql:'delete from bookrack where uid=?',
		success(data){
			res.send('ok')
		},
		error(err){
			res.send(err)
		}
	})
	// res.send('ok')
})
//添加评论
router.post('/comments_l',(req,res)=>{
	var json = req.body;
	console.log(json);
	pool.conn({
		arr:[json.names,json.img,json.zuoze,json.texts],
		sql:'insert into comments(names,img,zuoze,texts)values(?,?,?,?)',
		success(data){
			res.send('ok')
		},
		error(err){
			res.send(err)
		}
	})
})
//评论大厅
router.post('/com_hall',(req,res)=>{
	var json = req.body;
	console.log(json);
	pool.conn({
		arr:[json.names],
		sql:'select * from comments where names=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
	// res.send('ok')
})
//章节发布评论
router.post('/chap_com',(req,res)=>{
	var json = req.body;
	console.log(json);
	pool.conn({
		arr:[json.names],
		sql:'select * from comments where names=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
	// res.send('ok')
})
router.post('/read',(req,res)=>{
	var json = req.body;
	console.log(json);
	pool.conn({
		arr:[json.uid],
		sql:'select * from section_l where uid=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
	// res.send('ok')
})

module.exports = router;
