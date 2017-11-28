var throttling = function (callback, limit, time) {
    // From https://stackoverflow.com/questions/27078285/simple-throttle-in-js

    /// a variable to monitor the count
    var calledCount = 0;

    /// refesh the `calledCount` varialbe after the `time` has been passed
    setInterval(function () {
        calledCount = 0;
    }, time);

    /// creating a clousre that will be called
    var closure = function () {

        /// checking the limit (if limit is exceeded then do not call the passed function
        if (limit > calledCount) {
            /// increase the count
            calledCount++;
            callback(); /// call the function
        }
    }

    return closure; /// return the closure
}

export default throttling;