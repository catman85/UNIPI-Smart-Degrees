var Degrees = artifacts.require('Degrees');

contract('Degress', function(accounts) {
    var instance = null; // store the Users contract instance
    var mainAccount = accounts[0];
    var anotherAccount = accounts[1];

    it("Professors are properly Initialized", function() {
        return Degrees.deployed().then(function(_instance){
            instance = _instance;
            return instance.professors;
        }).then(function(result){
            assert(result);
            // assert.isTrue(true);
        })
    });

    it("Signing a hash works",function() {
        // "a" is our hash
        return instance.signGraduation("a",{
            from: mainAccount
        }).then(function(result) {
            assert(result);
        })
    });

    it("Student shouldn't have a degree yet",function() {
        return instance.verifyGraduation("a")
        .then(assert.fail).catch(function(error) { // here we are expecting the exception
            assert(true);
        });
    });

    it("Signing the same hash from another account works",function() {
        return instance.signGraduation("a",{
            from: anotherAccount
        }).then(function(result) {
            assert(result.receipt.status);
            // console.log(result.receipt.status);
        })
    });

    it("A Professor must not be able to sign the same hash twice", function(){
        // we are expecting this to fail
        return instance.signGraduation("a",{
            from: mainAccount
        }).then(assert.fail).catch(function(error) { // here we are expecting the exception
            assert(true);
        });
    });

    it("Student should have a degree now",function() {
        return instance.verifyGraduation("a")
        .then(function(result) { // here we are expecting the exception
            assert(result);
        });
    });

});