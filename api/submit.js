const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
    try {
        // 连接 MongoDB
        const client = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        const db = client.db();
        const collection = db.collection('survey-results');
        
        // 处理 POST 请求
        if (req.method === 'POST') {
            const data = JSON.parse(req.body);
            
            // 添加时间戳
            data.timestamp = new Date();
            
            // 保存到数据库
            await collection.insertOne(data);
            
            res.status(200).json({ message: '数据提交成功！' });
            client.close();
            return;
        }
        
        // 处理 GET 请求（可选，用于测试）
        res.status(200).json({ message: 'API 运行正常' });
        client.close();
    } catch (error) {
        console.error('服务器错误:', error);
        res.status(500).json({ error: '服务器内部错误' });
    }
};