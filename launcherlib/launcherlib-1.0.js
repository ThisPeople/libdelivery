const http = require('http');
const https = require('https');
const url = require('url');

class GameStoreAPISync {
    constructor(baseURL = 'http://localhost:3000') {
        this.baseURL = baseURL;
    }

    _requestSync(endpoint, method = 'GET', data = null) {
        const parsedUrl = url.parse(`${this.baseURL}${endpoint}`);
        const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || 80,
            path: parsedUrl.path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return new Promise((resolve, reject) => {
            const req = (parsedUrl.protocol === 'https:' ? https : http).request(options, (res) => {
                let responseData = '';
                res.on('data', (chunk) => {
                    responseData += chunk;
                });
                res.on('end', () => {
                    try {
                        const result = JSON.parse(responseData);
                        if (res.statusCode >= 200 && res.statusCode < 300) {
                            resolve(result);
                        } else {
                            reject(new Error(result.error || result.message || `HTTP ${res.statusCode}`));
                        }
                    } catch (e) {
                        reject(new Error('Invalid JSON response'));
                    }
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            if (data && (method === 'POST' || method === 'PUT')) {
                req.write(JSON.stringify(data));
            }
            req.end();
        });
    }

    // Все методы с синхронным выполнением (но возвращают Promise для удобства)
    getNickname() {
        return this._requestSync('/api/nickname', 'GET');
    }

    setNickname(nickname) {
        return this._requestSync('/api/nickname', 'POST', { nickname });
    }

    getBalance() {
        return this._requestSync('/api/balance', 'GET');
    }

    addBalance(amount) {
        return this._requestSync('/api/balance/add', 'POST', { amount });
    }

    subtractBalance(amount) {
        return this._requestSync('/api/balance/subtract', 'POST', { amount });
    }

    redeemKey(key) {
        return this._requestSync('/api/redeemKey', 'POST', { key });
    }

    checkGame(gameId) {
        return this._requestSync(`/api/checkGame/${gameId}`, 'GET');
    }

    getGameVersion(gameId) {
        return this._requestSync(`/api/getGameVersion/${gameId}`, 'GET');
    }

    getGameMetadata(gameId) {
        return this._requestSync(`/api/getGameMetadata/${gameId}`, 'GET');
    }

    purchaseGame(gameId, downloadURL) {
        return this._requestSync('/api/purchaseGame', 'POST', { gameId, downloadURL });
    }

    runGame(url) {
        return this._requestSync('/api/runGame', 'POST', { url });
    }

    openGameUrl(url) {
        return this._requestSync('/api/openGameUrl', 'POST', { url });
    }

    getAchievements(gameId) {
        return this._requestSync(`/api/achievements/${gameId}`, 'GET');
    }

    unlockAchievement(gameId, achievementId) {
        return this._requestSync('/api/achievements/unlock', 'POST', { gameId, achievementId });
    }

    getAchievementStats() {
        return this._requestSync('/api/achievements/stats', 'GET');
    }

    updateGameMetadata(gameId, metadata) {
        return this._requestSync('/api/updateGameMetadata', 'POST', { gameId, metadata });
    }

    getVersion() {
        return this._requestSync('/api/version', 'GET');
    }

    async ping() {
        try {
            await this.getVersion();
            return true;
        } catch {
            return false;
        }
    }
}

// Пример использования в Node.js (с async/await)
async function mainSync() {
    const api = new GameStoreAPISync('http://localhost:3000');
    
    try {
        const version = await api.getVersion();
        console.log('Version:', version.version);
        
        const balance = await api.getBalance();
        console.log('Balance:', balance.balance);
        
        const nickname = await api.getNickname();
        console.log('Nickname:', nickname.nickname);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = GameStoreAPISync;
