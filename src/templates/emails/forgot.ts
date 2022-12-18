const pubStyle = `
<style>
    button {
        background-color: #0f0f50;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        color: #fff;
        font-size: 16px;
        padding: 8px 30px;
        text-decoration: none;
        transition: 0.3s;
    }
    button:hover {
        background-color: #222;
    }
</style>
`
const resetPassTemp = (token: string) => {

    const template = `
    <!DOCTYPE html>
    <html>
    <head>
        ${pubStyle}
    </head>
        <body>
            <h1>Reset your password</h1>
            <p>If you sent this request and want to reset your password, click the Reset button.</p>
            <a href=http://localhost:3000/reset/${token}><button>Reset</button></a>
            <p>If you not asked for this, just ignore this email</p>
        </body>
    </html>
    `
    return template
}

export default resetPassTemp
