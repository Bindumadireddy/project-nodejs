var hapi=require('@hapi/hapi');
require("dotenv").config();
var mysql=require('mysql')

var server=new hapi.Server({
    host:'localhost',
    port:3000
});

//SECTION 1-PRODUCER
//1.1.GET

server.route({
    method:"GET",
    path:"/api/producer/",
    handler:(request,reply)=>{
      return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                //password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT * from producer`, function (error,producer, fields) {
                if (error) reject(error);
                resolve(producer);
              });
               
              connection.end();
        })
        
    }
    
});

//1.2.POST

server.route({
  method:"POST",
  path:"/api/producer/",
  handler:(request,reply)=>{
    var errors=[];
    var c=1;
    var names=request.payload.name;
    var mail=request.payload.email;
    var password=request.payload.password_hash;
    var twitter=request.payload.twitter_name;
    var soundcloud=request.payload.soundcloud_name;
    var statuss=request.payload.status;
    if((names.length==1)||(mail.length==1)||(password.length==1)||(twitter.length==1)||(soundcloud.length==1)){
      return "ALL FIELDS MUST BE FILLED";
    }
else{
    if(names.length>=32){
      errors.push("Name should contain less than 32 letters")
      c++;
    }
    if(names.includes("XxXxStr8FireXxX")==true){
      errors.push("Enter a valid name")
      c++;
    }
    if(mail.length>=256){
      errors.push("Mail should contain less than 256 letters")
      c++;
    }
    if((mail.includes('@')==false)||(mail.includes('.')==false)){
      errors.push("Enter a valid email")
      c++;
    }
    if(password.length<=10){
      errors.push("Enter a strong password ")
      c++;
    }
    if(twitter.length>=16){
      errors.push("Twitter Name must contain less than 16 letters")
      c++;
    }
    if(soundcloud.length>=32){
      errors.push("Sound Cloud Name must contain less than 32 letters")
      c++;
    }
    if((statuss!="none")&&(statuss!="not ready")&&(statuss!="featured")){
      errors.push("Not a valid status")
      c++;
    }
  }

  if(c!=1)
      return errors;
    else
{
    var newProducer=request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`INSERT INTO producer(name,email,password_hash,twitter_name,soundcloud_name,status) VALUES('${newProducer.name}','${newProducer.email}','${newProducer.password_hash}','${newProducer.twitter_name}','${newProducer.soundcloud_name}','${newProducer.status}')`, function (error, producer, fields) {
                if (error) reject(error);
                resolve(producer);
              });
               
              connection.end();
        })
        
    }
}
    
});

//1.3.GET ID

server.route({
    method:"GET",
    path:"/api/producer/{id}",
    handler:(request,reply)=>{
    	var id=request.params.id;
    	return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT * from producer where id=${id}`, function (error,producer, fields) {
                if (error) reject(error);
                resolve(producer);
              });
               
              connection.end();
        })
        
    }
    
});

//1.4.DELETE

server.route({
	method:"DELETE",
	path:"/api/producer/{id}",
	handler:(request,reply)=>{
		var num=request.params.id;
		
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
              	
              connection.query(`DELETE FROM producer WHERE id=${num}`, function (error, producer, fields) {
            if (error) reject (error);
           
            resolve(producer);
          });
           
          connection.end();
    })

    }
})

//1.5.PUT

server.route({
	method:"PUT",
	path:"/api/producer/{id}",
	handler:(request,reply)=>{
		var errors=[];
		var c=1;
		var names=request.payload.name;
		var mail=request.payload.email;
		var password=request.payload.password_hash;
		var twitter=request.payload.twitter_name;
		var soundcloud=request.payload.soundcloud_name;
		var statuss=request.payload.status;
		if((names.length==1)||(mail.length==1)||(password.length==1)||(twitter.length==1)||(soundcloud.length==1)){
			return "ALL THE FIELDS MUST BE FILLED";
		}
else{
		if(names.length>=32){
			errors.push("Name should contain less than 32 characters")
			c++;
		}
		if(names.includes("XxXxStr8FireXxX")==true){
			errors.push("Enter a valid name")
			c++;
		}
		if(mail.length>=256){
			errors.push("Mail should contain less than 256 characters")
			c++;
		}
		if((mail.includes('@')==false)||(mail.includes('.')==false)){
			errors.push("Enter a valid email")
			c++;
		}
		if(password.length<=10){
			errors.push("Enter a strong password ")
			c++;
		}
		if(twitter.length>=16){
			errors.push("Twitter Name must contain less than 16 characters")
			c++;
		}
		if(soundcloud.length>=32){
			errors.push("Sound Cloud Name must contain less than 32 characters")
			c++;
		}
		if((statuss!="none")&&(statuss!="not ready")&&(statuss!="featured")){
			errors.push("Not a valid status")
			c++;
		}
	}
	
		if(c!=1)
			return errors;
		else
		{
		var id=request.params.id;
		var newProducer=request.payload;
		
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
               connection.query(`UPDATE producer SET name='${newProducer.name}',
               	email='${newProducer.email}',
                password_hash='${newProducer.password_hash}',
                twitter_name='${newProducer.twitter_name}',
                soundcloud_name='${newProducer.soundcloud_name}'
            WHERE id=${id}`, function (error, producer, fields) {
            if (error) reject (error);
           
            resolve(producer);
          });
           
          connection.end();
    })
    }
}
    })

//2.0.GET

server.route({
    method:"GET",
    path:"/api/beat",
    handler:(request,reply)=>{
      return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT * from beat`, function (error,beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
    
});

//1.6.GET APPROVED BEATS

server.route({
    method:"GET",
    path:"/api/producer/approvedBeats",
    handler:(request,reply)=>{
    	var startdate=request.params.startdate;
    	var enddate=request.params.enddate;
    	return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT name,beat_name from producer inner join beat on producer.id=beat.producer_id where approved=1`, function (error,beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
    
});

//1.7.GET SUBMITTED BEATS

server.route({
    method:"GET",
    path:"/api/producer/submittedBeats",
    handler:(request,reply)=>{
    	var startdate=request.params.startdate;
    	var enddate=request.params.enddate;
    	return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT name,beat_name from producer inner join beat on producer.id=beat.producer_id where submit_date!='null'`, function (error,beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
    
});

//SECTION:2-BEATS
//2.1.GET IF SUBMITTED BUT NOT APPROVED 

server.route({
    method:"GET",
    path:"/api/beats/submitted",
    handler:(request,reply)=>{
    	var startdate=request.params.startdate;
    	var enddate=request.params.enddate;
    	return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT * from beat where submit_date!='null' and approved=0`, function (error,beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
    
});

//2.2.GET BEATS BETWEEN TWO DATES

server.route({
    method:"GET",
    path:"/api/beats/approved/{startdate}/{enddate}",
    handler:(request,reply)=>{
    	var startdate=request.params.startdate;
    	var enddate=request.params.enddate;
    	return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT * from beat where approved=1 and post_date_time between '${startdate}'and'${enddate}'`, function (error,beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
    
});

//2.3.GET BEATS FROM A CERTAIN DATE TO TILL DATE

server.route({
    method:"GET",
    path:"/api/beats/posted/{startdate}",
    handler:(request,reply)=>{
      var startdate=request.params.startdate;
      var enddate=request.params.enddate;
      return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT * from beat where approved=1 and post_date_time between '${startdate}'and current_timestamp`, function (error,beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
    
});

//2.4.GET APPROVED BEATS WITH NO YET APPROVAL DATE

server.route({
    method:"GET",
    path:"/api/beats/pending",
    handler:(request,reply)=>{
      return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT * from beat where approved=1 and approval_date>current_timestamp or approval_date='null' `, function (error,beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
    
});

//2.5.POST

server.route({
	method:"POST",
	path:"/api/beats",
	handler:(request,reply)=>{

		var errors=[];
		var c=1;
		var name=request.payload.beat_name;
    var url=request.payload.beat_url;
    var approval=request.payload.approved;
    var producers=request.payload.producer_id;
    var submit=request.payload.submit_date;
    var approve=request.payload.approval_date;
    var posted=request.payload.post_date_time;
    if(name.length==1||url.length==1||approval.length==1||producers.length==1||submit.length==1||approve.length==1||posted.length==1){
      return "ALL THE FIELDS MUST BE FILLED";
    }
    else{
		if(name.length>=64){
			errors.push("Name should contain less than 64 characters")
			c++;
		}
		if(name.includes("MUST LISTEN")==true){
			errors.push("Not a valid name")
			c++;
		}
  }
    if(c!=1)
			return errors;
		else
		{
		var newBeat=request.payload;
		
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
               connection.query(`INSERT INTO beat(beat_name,beat_url,approved,producer_id,submit_date,approval_date,post_date_time) VALUES('${newBeat.beat_name}','${newBeat.beat_url}','${newBeat.approved}','${newBeat.producer_id}','${newBeat.submit_date}','${newBeat.approval_date}','${newBeat.post_date_time}')`, function (error, beat, fields) {
            if (error) reject (error);
           
            resolve(beat);
          });
           
          connection.end();
    })
    }
}
    })

//2.6.GET ID

server.route({
    method:"GET",
    path:"/api/beats/{id}",
    handler:(request,reply)=>{
      var id=request.params.id;
      return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT * from beat where beat_id=${id}`, function (error,beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
    
});

//2.7.DELETE

server.route({
  method:"DELETE",
  path:"/api/beats/{id}",
  handler:(request,reply)=>{
    var id=request.params.id;
    
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
                
              connection.query(`DELETE FROM beat WHERE beat_id=${id}`, function (error, beat, fields) {
            if (error) reject (error);
           
            resolve(beat);
          });
           
          connection.end();
    })

    }
})

//2.8.PUT

server.route({
	method:"PUT",
	path:"/api/beats/{id}",
	handler:(request,reply)=>{
    var errors=[];
    var c=1;
    var name=request.payload.beat_name;
    var url=request.payload.beat_url;
    var approval=request.payload.approved;
    var producers=request.payload.producer_id;
    var submit=request.payload.submit_date;
    var approve=request.payload.approval_date;
    var posted=request.payload.post_date_time;
		var name=request.payload.beat_name;
    if(name.length==1||url.length==1||approval.length==1||producers.length==1||submit.length==1||approve.length==1||posted.length==1){
      return "ALL THE FIELDS MUST BE FILLED";
    }
    else{
		if(name.length>=64){
			errors.push("Name should contain less than 64 characters")
			c++;
		}
		if(name.includes("MUST LISTEN")==true){
			errors.push("Not a valid name")
			c++;
		}
  }
		if(c!=1)
			return errors;
		else
		{
			var id=request.params.id;
		var newBeat=request.payload;
		
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
              connection.query(`UPDATE beat SET beat_name='${newBeat.beat_name}',
               	beat_url='${newBeat.beat_url}',
                approved='${newBeat.approved}',
                producer_id='${newBeat.producer_id}',
                submit_date='${newBeat.submit_date}',
                approval_date='${newBeat.approval_date}',
                post_date_time='${newBeat.post_date_time}'
            WHERE beat_id=${id}`, function (error,beat, fields) {
            if (error) reject (error);
           
            resolve(beat);
          });
           
          connection.end();
    })
    }
}
    })

//2.9.PUT APPROVED BEATS

server.route({
  method:"PUT",
  path:"/api/beats/approve/{id}",
  handler:(request,reply)=>{
    var errors=[];
    var c=1;
    var name=request.payload.beat_name;
    if(name.length>=64){
      errors.push("Name should contain less than 64 characters")
      c++;
    }
    if(name.includes("MUST LISTEN")==true){
      errors.push("Not a valid name")
      c++;
    }
    if(c!=1)
      return errors;
    else
    {
      var id=request.params.id;
    var newBeat=request.payload;
    
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
              connection.query(`UPDATE beat SET 
                approval_date='${newBeat.approval_date}',
                post_date_time='${newBeat.post_date_time}'
            WHERE beat_id=${id}`, function (error,beat, fields) {
            if (error) reject (error);
           
            resolve(beat);
          });
           
          connection.end();
    })
    }
}
    })

//2.10.PUT UNAPPROVED BEATS

server.route({
  method:"PUT",
  path:"/api/beats/unapprove/{id}",
  handler:(request,reply)=>{
    var errors=[];
    var c=1;
    var name=request.payload.beat_name;
    if(name.length>=64){
      errors.push("Name should contain less than 64 characters")
      c++;
    }
    if(name.includes("MUST LISTEN")==true){
      errors.push("Not a valid name")
      c++;
    }
    if(c!=1)
      return errors;
    else
    {
      var id=request.params.id;
    var newBeat=request.payload;
    
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
              connection.query(`UPDATE beat SET 
                approval_date='${newBeat.approval_date}',
                post_date_time='${newBeat.post_date_time}'
            WHERE beat_id=${id}`, function (error,beat, fields) {
            if (error) reject (error);
           
            resolve(beat);
          });
           
          connection.end();
    })
    }
}
    })


server.start((err)=>{
    if(err) throw err;
    
})


console.log("Server is started")