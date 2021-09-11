
export const successShaRes = (res, user, repo, branch, sha) => {
    return res.status(200).json({
        user: user,
        repo: repo,
        branch: branch,
        data: sha
    })
}

export const axiosTimeOut = (res) => {
    return res.status(505).json({
        success: true,
        authentication: false,
        message: "Server upstream timeout."
    })
}