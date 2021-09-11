import axios from 'axios';
import { axiosTimeOut, successShaRes } from '../responses/gtihubResponse.js';

export const lastcommit = async (req, res, next) => {
    let { user, repo, branch } = req.query;
    !user && (user = `minlaxz`);
    !branch && (branch = `main`);
    const url = `https://api.github.com/repos/${user}/${repo}/branches/${branch}`

    await axios.get(url, {
        headers: { 'User-Agent': 'curl/7.68.0' }, timeout: 3000
    })
        .then(data => (data.data.commit.sha))
        .then(sha => successShaRes(res, user, repo, branch, sha))
        .catch(error => {
            error.isAxiosError || error.code === "ECONNABORTED"
                ? axiosTimeOut(res)
                : next(error);
        });
}