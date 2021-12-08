const conn = require('./db')

module.exports = {

    render(req, res,error,success){
        res.render('reservations', {title: 'reservas - Restaurante saboroso',
        background: 'images/img_bg_2.jpg',
        h1: 'Reserve uma mesa',
        body: req.body,
        error,
        success
    })

    },

    save(fields){

        return new Promise((res,rej)=>{

            if(fields.date.indexOf('/') > -1){
                
                let date = fields.date.split('/')
    
                fields.date = `${date[2]}-${date[1]}-${date[0]}`
            }


            let query, params = [
                fields.name,
                fields.email,
                fields.people,
                fields.date,
                fields.time
            ]

            if(parseInt(fields.id) > 0){

                query = `
                    UPDATE tb_reservations
                    SET name = ?,
                    email = ?,
                    people = ?,
                    date = ?,
                    time = ?
                    WHERE id = ?
                `
                params.push(fields.id)

            }else{

                query = `INSERT INTO tb_reservations (name,email,people,date,time) VALUES (?,?,?,?,?)`

            }

            conn.query(query,params, (err, results)=>{
    
                if(err){
                    rej(err)
                }else{
                    res(results)
                }     
    
            })

        })

    },

    getReservations(){

        return new Promise((s,f)=>{

            conn.query(`SELECT * FROM tb_reservations ORDER BY date DESC`, (err, result)=>{
            if(err){
                f(err)
            }
            
            s(result)

            })

        })

    },

    delete(id){

        return new Promise((resolve, reject)=>{

            conn.query(`DELETE FROM tb_reservations WHERE id = ?`, [
                id
            ], (err,results)=>{

                if(err){
                    reject(err)
                }else{
                    resolve(results)
                }

            })

        })
    }

}