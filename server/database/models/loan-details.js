const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

const loanSchema = new Schema({
    "_id": { type: String, unique: true, required: false },
    "member_id":{ type: Number, unique: false, required: false },
    "loan_amnt": { type: Number, unique: false, required: false },
    "funded_amnt_inv": { type: Number, unique: false, required: false },
    "term": { type: String, unique: false, required: false },
    "int_rate": { type: Number, unique: false, required: false },
    "installment": { type: Number, unique: false, required: false },
    "grade":{ type: String, unique: false, required: false },
    "emp_title": { type: String, unique: false, required: false },
    "emp_length": { type: String, unique: false, required: false },
    "home_ownership": { type: String, unique: false, required: false },
    "annual_inc": { type: Number, unique: false, required: false },
    "verification_status": { type: String, unique: false, required: false },
    "issue_d": { type: String, unique: false, required: false },
    "loan_status": { type: String, unique: false, required: false },
    "desc": { type: String, unique: false, required: false },
    "purpose": { type: String, unique: false, required: false },
    "title": { type: String, unique: false, required: false },
    "addr_state": { type: String, unique: false, required: false },
    "last_pymnt_d": { type: String, unique: false, required: false },
    "last_pymnt_amnt": { type: Number, unique: false, required: false },
})
const LoanCollection = mongoose.model('LoanCollection', loanSchema, 'loan-details')

 class LoanDetailcollection {
  static findAll (cb){

    LoanCollection.find({}, cb)
  }

  static create (data, cb) {
    LoanCollection.insert(data, cb)
  }
  
  static findByLimitAndSearch(page, count,memberIdText, cb) {
    console.log('******' ,memberIdText)
    LoanCollection.find({
        "member_id": parseInt(memberIdText)
    }, cb).skip(Number(page) * Number(count)).limit(Number(count))
  }
  static findByLimit(page, count, cb) {

    LoanCollection.find({
        
    }, cb).skip(Number(page) * Number(count)).limit(Number(count))
  }
  static count(cb) {
      LoanCollection.count(cb)
  }
  static countByFilter(memberIdText, cb) {
    LoanCollection.find({
        "member_id": parseInt(memberIdText)
    }).count(cb)
}
  static findByMemId (id, cb) {
    LoanCollection.findOne({
        "member_id": parseInt(id)
    }, cb)
  }
  static topTenVerifiedCustomers (cb) {
      
    LoanCollection.find({
        "verification_status": {"$in":  ["Verified", "Source Verified"] }
    }, cb).sort({
        "loan_amnt": -1
    }).limit(10, cb);
  }
  static topTenUnVerifiedCustomers (cb) {

    LoanCollection.find({
        "verification_status" :  "Not Verified" 
    }, cb).sort({
        "loan_amnt": -1,
        
    }).limit(10);
  }
  static getTopInterestPayers(cb) {
    LoanCollection.find({
        

    }, cb).sort({
        "loan_amnt": -1,
        "int_rate": -1,
    }).limit(10);
  }
  static format(cb) {
    LoanCollection.aggregate([
        { "$addFields": {
            "issue_d": { 
                "$dateFromString": { 
                    "dateString": "$issue_d",
                    "format": "%m-%Y" /* <-- option available only in version 4.0. and newer */
                } 
            },
            "last_pymnt_d": { 
                "$dateFromString": { 
                    "dateString": "$last_pymnt_d",
                    "format": "%m-%Y" /* <-- option available only in version 4.0. and newer */
                } 
            }
        } }
    ], cb)
  }
//   static update (id, update, cb) {
//     collection.findAndModify({
//       query : { _id: id},
//       update : { '$set': update }
//     }, cb)
//   }

//   static delete (id, cb) {
//     collection.remove({_id: id}, cb)
//   }

}

module.exports = LoanDetailcollection