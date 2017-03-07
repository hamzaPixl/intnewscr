let ConfigReader = require('./../configs/ConfigReader');
let ModuleLocator = require('./../ModuleLocator');

function Controller() {
    this.moduleLocator = new ModuleLocator();
}

Controller.prototype = {

    /**
     * Execute the request that we receive
     * and return the result if all request is valid
     *  
     * @return null
     * @return {{*}} result for the resquest
     */
    request: function request(request) {

        let moduleName = this.getModuleNameFromRequest(request);

        if (!moduleName) {
            return null;
        }

        let ModuleMain = this.moduleLocator.getModuleMain(moduleName);

        if (!ModuleMain) {
            return null;
        }

        let main = new ModuleMain();

        if (!this.requestIsValid(request, main)) {
            return null;
        }

        let ModuleController = this.moduleLocator.getModuleController(moduleName);
        let reader = new ConfigReader(moduleName, this.moduleLocator);

        if (!ModuleController || !reader.getConfig() || !reader.getServices()) {
            return null;
        }

        let controller = new ModuleController(this.moduleLocator, reader.getConfig(), reader.getServices());

        return this.getResult(controller, request, main);

    },

    /**
     * returns the result of the request
     * it gives the data, it call the function of the controller of the module
     * 
     * @private
     *  
     * @return null
     * @return {{*}} result
     */
    getResult: function getResult(controller, request, main) {
        let routeConfig = this.getConfigRoute(request, main);
        if (!routeConfig)
            return null;
        if (routeConfig.query) {
            return controller[routeConfig.callback](request.params);
        }
        return controller[routeConfig.callback]();
    },


    /**
     * returns the configuration of a specific route
     * from the request
     * 
     * @see Main::getRoute
     * 
     * @private
     *  
     * @return null
     * @return {{*}} configuration of route
     */

    getConfigRoute: function getConfigRoute(request, main) {
        let routeConfig = main.getRoute(request.path);
        if (routeConfig)
            return routeConfig;
        return null;
    },

    /**
     * returns true if the request is valid 
     * by checking route, query, and arguments
     * 
     * @see Controller::requestIsValid
     * 
     * @private
     *  
     * @return false is not valid
     * @return true it is
     */
    requestIsValid: function requestIsValid(request, main) {
        let routeConfig = this.getConfigRoute(request, main);

        if (!routeConfig)
            return false;

        if (routeConfig.method !== request.method)
            return false;

        if (routeConfig.query)
            return this.argumentsIsValid(request, routeConfig);

        return true;
    },

    /**
     * returns true if the arguments of the 
     * request is valid by checking configuration
     * 
     * @private
     *  
     * @return false is not valid
     * @return true it is
     */
    argumentsIsValid: function argumentsIsValid(request, routeConfig) {
        for (var key in routeConfig.query) {
            if (!request.param(key) || typeof(request.param(key)) !== routeConfig.query[key])
                return false;
        }
        return true;
    },

    /**
     * returns the name of the modulefrom an url
     * 
     * @private
     *  
     * @return null if the name not match the pattern
     * @return {string} the module name
     */
    getModuleNameFromRequest: function getModuleNameFromRequest(request) {
        let moduleName = request.baseUrl.split("/")[1];
        var patt = new RegExp("^[a-z]+$");
        if (!patt.test(moduleName))
            return null;
        return moduleName;
    }
};

module.exports = Controller;