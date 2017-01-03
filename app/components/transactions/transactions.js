(function () {
    /**
     * transactions Components module.
     *
     * @module metaCoinApp.components.transactions
     */
    'use strict';
    angular
        .module('metaCoinApp.components.transactions', [])
        .component('transactions', {
            controller: Controller,
            templateUrl: 'components/transactions/transactions.html',
            $canActivate: $canActivate
        });


    function Controller($timeout) {
        console.log('transaction  Controller Constructor');
        var ctrl = this;
        ctrl.amount = 0;
        ctrl.receiver = "";
        ctrl.$timeout = $timeout;
        ctrl.balance = 0;
        web3.eth.getAccounts(function (err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }

            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }

            ctrl.accounts = accs;
            console.log("ACCOUNTS");
            console.log(accs);
            ctrl.account = ctrl.accounts[0];

            console.log("CURRENT ACCOUNT");
            console.log(ctrl.account);

            ctrl.refreshBalance();
        });
    }

    Controller.$inject = ['$timeout'];
    Controller.prototype.refreshBalance = function () {
        var meta = MetaCoin.deployed();
        var ctrl = this;
        console.log("EXECUTE REFRESH BALANCE");
        meta.getBalance.call(this.account, {from: this.account})
            .then(function (value) {
                console.log("VALUE REFRESH BALANCE");
                console.log(value);
                ctrl.$timeout(function () {
                    ctrl.balance = value.valueOf();
                });
            }).catch(function (e) {
            console.log(e);
            alert("Error getting balance; see log.");
        });
    };

    Controller.prototype.sendCoin = function (amount, receiver) {
        // Remove the 2 lines that pick amount and receiver from the DOM.
        var ctrl = this;
        console.log('sending coin');
        var meta = MetaCoin.deployed();
        alert("Initiating transaction... (please wait)");
        meta.sendCoin(receiver, parseInt(amount), {from: this.account}).then(
            function () {
                alert("Transaction complete!");
                
                ctrl.$timeout(function () {
                    ctrl.refreshBalance();
                });
            }).catch(function (e) {
            console.log(e);
            alert("Error sending coin; see log.");
        });
    };

    // Everything else will come in here.

    function $canActivate() {
        console.log('Sha  Controller $canActivate');
        return true;
    }

    Controller.prototype.$onInit = function () {
        var ctrl = this;
        console.log('Transactions Controller $onInit');

        ctrl.onInit = 'Success';
    };
    Controller.prototype.$onInit = function () {
        var ctrl = this;
        console.log('Transactions Controller $onInit');
        ctrl.onInit = 'Success';
    };

    Controller.prototype.$routerOnActivate = function () {
        console.log('Transactions Controller $routerOnActivate');
    };

    Controller.prototype.$routerCanReuse = function () {
        console.log('Transactions Controller $routerCanReuse');
        return true;
    };

    Controller.prototype.$routerOnReuse = function () {
        console.log('Transactions Controller $routerOnReuse');
    };

    Controller.prototype.$routerCanDeactivate = function () {
        console.log('Transactions Controller $routerCanDeactivate');
        return true;
    };

    Controller.prototype.$routerOnDeactivate = function () {
        console.log('Transactions Controller $routerOnDeactivate');
    };
})();