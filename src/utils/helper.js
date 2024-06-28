export const getUTMParameters = () => {
    const params = new URLSearchParams(window.location.search);
    const queryParameters = {};
    params.forEach((value, key) => {
        queryParameters[key] = value;
    });
    return queryParameters;
};
