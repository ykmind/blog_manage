export default {
  'POST /api/login': (req: any, res: any) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '000000') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      const data = {
        code: 200,
        message: '登陆成功',
        token: Math.random()
          .toString()
          .slice(2),
        nickname: 'jinashui',
      };
      res.status(200).send(data);
    } else {
      res.end('error: please enter right username and password');
    }
    console.log();
  },
};
