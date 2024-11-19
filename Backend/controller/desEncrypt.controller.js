const desEncrypt = (req, res) => {
    const text = req.body.text;
    console.log(text);
    res.status(200).json({ status : "ok" });
}

export default desEncrypt;
