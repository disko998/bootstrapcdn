"use strict";
const axios = require("axios").default;

const baseURL = "https://data.jsdelivr.com/v1/package/npm";

async function getPackage(packageName) {
    const { data } = await axios.get(`${baseURL}/${packageName}`);
    return data;
}

async function onPackageVersions({ versions }) {
    try {
        const promises = versions.map(async (version) => {
            return await getPackage(`bootstrap@${version}`);
        });

        const packages = await Promise.all(promises);

        console.log(packages);
    } catch (error) {
        console.error(error);
    }
}

getPackage("bootstrap")
    .then(onPackageVersions)
    .catch((err) => {
        console.log(err.message);
    });
