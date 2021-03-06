const Database = require('../db/config');

module.exports = {
    async create(req, res) {
        const db = await Database();    
        const pass = req.body.password;

        let roomId;
        let hasRoom = true;

        while (hasRoom) {
            /* Gera o número da sala */
            for (var i = 0; i < 6; i++) {
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                roomId += Math.floor(Math.random() * 10).toString();
            };

            /* Verifica se esse número já existe */
            const roomsExistIds = await db.all(`SELECT id FROM rooms`);
    
            hasRoom = roomsExistIds.some(roomExistId => roomExistId === roomId);

            if (!hasRoom) {
                /* Insere a sala no banco */
                await db.run(`INSERT INTO rooms (
                    id, 
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`);
            };
        };

        await db.close();

        res.redirect(`/room/${roomId}`);
    },

    async open(req, res) {
        const db = await Database();
        const roomId = req.params.room;
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`);
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`);
        let hasQuestions;

        if (questions.length == 0) {
            if (questionsRead.length == 0) {
                hasQuestions = true;
            }
        };

        res.render('room', { roomId : roomId, questions : questions, questionsRead : questionsRead, hasQuestions : hasQuestions });

    },

    enter (req, res) {
        const roomId = req.body.roomId;

        res.redirect(`/room/${roomId}`);
    }
}