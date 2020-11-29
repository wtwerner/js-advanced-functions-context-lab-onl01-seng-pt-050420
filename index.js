/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(arr) {
    let record = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return record
}

function createEmployeeRecords(data) {
    return data.map(employee => createEmployeeRecord(employee))
}

let createTimeInEvent = function(dateStamp) {
    this.timeInEvents.push({
        type: "TimeIn",
        date: dateStamp.split(" ")[0],
        hour: parseInt(dateStamp.split(" ")[1])
    })
    return this
}

let createTimeOutEvent = function(dateStamp) {
    this.timeOutEvents.push({
        type: "TimeOut",
        date: dateStamp.split(" ")[0],
        hour: parseInt(dateStamp.split(" ")[1])
    })
    return this
}

let hoursWorkedOnDate = function(dateStamp) {
    let timeIn = this.timeInEvents.find(e => e.date === dateStamp)
    let timeOut = this.timeOutEvents.find(e => e.date === dateStamp)
    return (timeOut.hour - timeIn.hour)/100
}

let wagesEarnedOnDate = function(dateStamp) {
    return this.payPerHour * hoursWorkedOnDate.call(this, dateStamp)
}

function calculatePayroll(arr) {
    return arr.reduce(function(total, record) {
        return total + allWagesFor.call(record)
    }, 0)
}

function findEmployeeByFirstName(arr, name) {
    return arr.find(r => r.firstName === name)
}