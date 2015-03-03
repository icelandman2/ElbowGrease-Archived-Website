import simplify
import cgi

##Sandbox keys sbpb_ZTg3OWIwY2QtZTcyMi00YTA4LWJiOTctMzFjMmQzYjcwMzEw  and  LeTlOaw3d89R0aFSRU12zp3MT5katOBRVibVBcJYaex5YFFQL0ODSXAOkNtXTToq
simplify.public_key = "sbpb_ZTg3OWIwY2QtZTcyMi00YTA4LWJiOTctMzFjMmQzYjcwMzEw"
simplify.private_key = "LeTlOaw3d89R0aFSRU12zp3MT5katOBRVibVBcJYaex5YFFQL0ODSXAOkNtXTToq"
 
formData = cgi.FieldStorage()

amount = .1 #formData.getValue()
planName = "examplePlan" #formData.getValue()


plan = simplify.Plan.create({
        "amount" : amount,
        "name" : planName,
        "frequency" : "MONTHLY"
 
})
 
print plan

email = formData.getValue(email)
name = formData.getValue(name)
cc-exp-month = formData.getValue(cc-exp-month)
cc-exp-year = formData.getValue(cc-exp-year)
cc-cvc = formData.getValue(cc-cvc)
cc-number = formData.getValue(cc-number)

customer = simplify.Customer.create({
        "subscriptions" : [
           {
              "plan" : plan
           }
        ],
        "email" : email,
        "name" : name,
        "card" : {
           "expMonth" : cc-exp-month,
           "expYear" : cc-exp-year,
           "cvc" : cc-cvc,
           "number" : cc-number
        },
        "reference" : "None"
 
})
 
print customer