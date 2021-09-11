import axios from 'axios';
import { axiosTimeOut, successShaRes } from '../responses/gtihubResponse.js';

export const lastcommit = (req, res, next) => {
    let { user, repo, branch } = req.query;
    !user && (user = `minlaxz`);
    !branch && (branch = `main`);
    const url = `https://api.github.com/repos/${user}/${repo}/branches/${branch}`
    axios.get(url, {
        headers: { 'User-Agent': 'curl/7.68.0' }, timeout: 3000
    })
        .then(data => (data.data.commit.sha))
        .then(sha => successShaRes(res, user, repo, branch, sha))
        .catch(error => {
            if (error.isAxiosError || error.code === "ECONNABORTED") {
                return axiosTimeOut(res)
            }
            next(error);
        });


}