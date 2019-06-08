const express = require('express')
const router = express.Router()
const LoanDetailcollection = require('../database/models/loan-details')

router.get('/', (req, res) => {
    const { page, count, memberIdText = '' } = req.query;
    
    console.log( '-------->', )
    if (parseInt(memberIdText) >= 0 ) {
        LoanDetailcollection.findByLimitAndSearch(page, count, parseInt(memberIdText), (err, data) => {
            if (err) {
                res.status(502).send(err)
            }
            LoanDetailcollection.countByFilter(parseInt(memberIdText), (err, count) => {
                return res.json({data: data, count: count});
            })
            
        })
    } else {
        if (memberIdText != '') {
            return res.json({ data: [], count: 0 })
        }
        LoanDetailcollection.findByLimit(page, count, (err, data) => {
            if (err) {
                res.status(502).send(err)
            }
            LoanDetailcollection.count((err, count) => {
                return res.json({data: data, count: count});
            })
            
        })
        
    }
    
})

router.get('/details/', (req, res) => {
    const { memId = '' } = req.query
    LoanDetailcollection.findByMemId(memId, (err, data) => {
        if (err) {
            res.status(502).send(err)
        }
        res.json(data)
    })
})
router.get('/topInterestPayers/', (req, res) => {
    LoanDetailcollection.getTopInterestPayers( (err, data) => {
        if (err) {
            res.status(502).send(err)
        }
        res.json(data)
    })
})
router.get('/topTen/', (req, res) => {
   LoanDetailcollection.topTenVerifiedCustomers( (err, topTenVerified) => {
        if (err) {
            res.status(502).send(err)
        }
        LoanDetailcollection.topTenUnVerifiedCustomers( (err, topTenUnVerified) => {
            if (err) {
                res.status(502).send(err)
            }
            
            res.json({ topTenVerified, topTenUnVerified })
        })
        
    })
})

router.get('/format/', (req, res) => {
    LoanDetailcollection.format( (err, topTenVerified) => {
        res.json(topTenVerified)
         
     })
 })

module.exports = router