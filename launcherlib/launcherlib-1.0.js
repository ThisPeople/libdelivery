class GameStoreAPI {
    constructor(baseURL = 'http://localhost:27765') {
        this.baseURL = baseURL;
    }

    /**
     * Базовый метод для выполнения HTTP запросов
     */
    _request(endpoint, method = 'GET', data = null, callback = null) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, `${this.baseURL}${endpoint}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function() {
            try {
                const result = JSON.parse(xhr.responseText);
                if (xhr.status >= 200 && xhr.status < 300) {
                    if (callback) callback(null, result);
                } else {
                    if (callback) callback(new Error(result.error || result.message || `HTTP ${xhr.status}`), null);
                }
            } catch (e) {
                if (callback) callback(new Error('Invalid JSON response'), null);
            }
        };

        xhr.onerror = function() {
            if (callback) callback(new Error('Network error'), null);
        };

        if (data && (method === 'POST' || method === 'PUT')) {
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    }

    // ============ NICKNAME ============

    /**
     * Get current nickname
     * @param {Function} callback - (error, result) => void
     */
    getNickname(callback) {
        this._request('/api/nickname', 'GET', null, callback);
    }

    /**
     * Set new nickname
     * @param {string} nickname - New nickname
     * @param {Function} callback - (error, result) => void
     */
    setNickname(nickname, callback) {
        this._request('/api/nickname', 'POST', { nickname }, callback);
    }

    // ============ BALANCE ============

    /**
     * Get current balance
     * @param {Function} callback - (error, result) => void
     */
    getBalance(callback) {
        this._request('/api/balance', 'GET', null, callback);
    }

    /**
     * Add funds to balance
     * @param {number} amount - Amount to add
     * @param {Function} callback - (error, result) => void
     */
    addBalance(amount, callback) {
        this._request('/api/balance/add', 'POST', { amount }, callback);
    }

    /**
     * Subtract funds from balance
     * @param {number} amount - Amount to subtract
     * @param {Function} callback - (error, result) => void
     */
    subtractBalance(amount, callback) {
        this._request('/api/balance/subtract', 'POST', { amount }, callback);
    }

    // ============ KEYS ============

    /**
     * Redeem recharge key
     * @param {string} key - Key to redeem
     * @param {Function} callback - (error, result) => void
     */
    redeemKey(key, callback) {
        this._request('/api/redeemKey', 'POST', { key }, callback);
    }

    // ============ GAMES ============

    /**
     * Check if game is installed
     * @param {string} gameId - Game ID
     * @param {Function} callback - (error, result) => void
     */
    checkGame(gameId, callback) {
        this._request(`/api/checkGame/${gameId}`, 'GET', null, callback);
    }

    /**
     * Get game version
     * @param {string} gameId - Game ID
     * @param {Function} callback - (error, result) => void
     */
    getGameVersion(gameId, callback) {
        this._request(`/api/getGameVersion/${gameId}`, 'GET', null, callback);
    }

    /**
     * Get game metadata
     * @param {string} gameId - Game ID
     * @param {Function} callback - (error, result) => void
     */
    getGameMetadata(gameId, callback) {
        this._request(`/api/getGameMetadata/${gameId}`, 'GET', null, callback);
    }

    /**
     * Purchase game
     * @param {string} gameId - Game ID
     * @param {string} downloadURL - Download URL
     * @param {Function} callback - (error, result) => void
     */
    purchaseGame(gameId, downloadURL, callback) {
        this._request('/api/purchaseGame', 'POST', { gameId, downloadURL }, callback);
    }

    /**
     * Run game
     * @param {string} url - Game URL
     * @param {Function} callback - (error, result) => void
     */
    runGame(url, callback) {
        this._request('/api/runGame', 'POST', { url }, callback);
    }

    /**
     * Open URL in game window
     * @param {string} url - URL to open
     * @param {Function} callback - (error, result) => void
     */
    openGameUrl(url, callback) {
        this._request('/api/openGameUrl', 'POST', { url }, callback);
    }

    // ============ ACHIEVEMENTS ============

    /**
     * Get game achievements
     * @param {string} gameId - Game ID
     * @param {Function} callback - (error, result) => void
     */
    getAchievements(gameId, callback) {
        this._request(`/api/achievements/${gameId}`, 'GET', null, callback);
    }

    /**
     * Unlock achievement
     * @param {string} gameId - Game ID
     * @param {string} achievementId - Achievement ID
     * @param {Function} callback - (error, result) => void
     */
    unlockAchievement(gameId, achievementId, callback) {
        this._request('/api/achievements/unlock', 'POST', { gameId, achievementId }, callback);
    }

    /**
     * Get achievement stats
     * @param {Function} callback - (error, result) => void
     */
    getAchievementStats(callback) {
        this._request('/api/achievements/stats', 'GET', null, callback);
    }

    // ============ METADATA ============

    /**
     * Update game metadata
     * @param {string} gameId - Game ID
     * @param {Object} metadata - New metadata
     * @param {Function} callback - (error, result) => void
     */
    updateGameMetadata(gameId, metadata, callback) {
        this._request('/api/updateGameMetadata', 'POST', { gameId, metadata }, callback);
    }

    // ============ VERSION ============

    /**
     * Get API version
     * @param {Function} callback - (error, result) => void
     */
    getVersion(callback) {
        this._request('/api/version', 'GET', null, callback);
    }

    // ============ UTILITIES ============

    /**
     * Check server availability
     * @param {Function} callback - (error, isAvailable) => void
     */
    ping(callback) {
        this.getVersion((error, result) => {
            if (callback) {
                if (error) {
                    callback(null, false);
                } else {
                    callback(null, true);
                }
            }
        });
    }

    /**
     * Download game file (browser version)
     * @param {string} url - File URL
     * @param {Function} callback - (error, content) => void
     */
    downloadGameFile(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                if (callback) callback(null, xhr.responseText);
            } else {
                if (callback) callback(new Error('Failed to download: HTTP ' + xhr.status), null);
            }
        };
        
        xhr.onerror = function() {
            if (callback) callback(new Error('Network error'), null);
        };
        
        xhr.send();
    }
}

// ============ USAGE EXAMPLES ============

// Create instance
var api = new GameStoreAPI('http://localhost:27765');

// 1. Get version
api.getVersion(function(error, result) {
    if (error) {
        console.error('Error:', error.message);
        return;
    }
    console.log('API Version:', result.version);
});

// 2. Work with nickname
api.getNickname(function(error, result) {
    if (error) {
        console.error('Error:', error.message);
        return;
    }
    console.log('Current nickname:', result.nickname);
    
    // Set new nickname
    api.setNickname('MyNewNick', function(error, result) {
        if (error) {
            console.error('Error:', error.message);
            return;
        }
        console.log('Nickname updated:', result.nickname);
    });
});

// 3. Work with balance
api.getBalance(function(error, result) {
    if (error) {
        console.error('Error:', error.message);
        return;
    }
    console.log('Current balance:', result.balance);
});

// 4. Add funds
api.addBalance(100, function(error, result) {
    if (error) {
        console.error('Error:', error.message);
        return;
    }
    console.log('Balance after add:', result.balance);
});

// 5. Subtract funds
api.subtractBalance(50, function(error, result) {
    if (error) {
        console.error('Error:', error.message);
        return;
    }
    console.log('Balance after subtract:', result.balance);
});

// 6. Redeem key
api.redeemKey('ABC123-YourKey', function(error, result) {
    if (error) {
        console.error('Error:', error.message);
        return;
    }
    console.log('Key redeemed! Amount:', result.amount, 'New balance:', result.newBalance);
});

// 7. Work with games
api.checkGame('game123', function(error, result) {
    if (error) {
        console.error('Error:', error.message);
        return;
    }
    console.log('Game exists:', result.exists);
});

api.getGameVersion('game123', function(error, result) {
    if (error) {
        console.error('Error:', error.message);
        return;
    }
    console.log('Game version:', result.version);
});

// 8. Get achievements
api.getAchievements('game123', function(error, result) {
    if (error) {
        console.error('Error:', error.message);
        return;
    }
    console.log('Achievements:', result.achievements);
});

// 9. Unlock achievement
api.unlockAchievement('game123', 'ach_1', function(error, result) {
    if (error) {
        console.error('Error:', error.message);
        return;
    }
    console.log('Achievement unlocked:', result.unlocked);
});

// 10. Purchase game
api.purchaseGame('game123', 'https://example.com/game.html', function(error, result) {
    if (error) {
        console.error('Error:', error.message);
        return;
    }
    console.log('Purchase result:', result);
});

// 11. Run game
api.runGame('http://localhost:27765/games/game123/game.html', function(error, result) {
    if (error) {
        console.error('Error:', error.message);
        return;
    }
    console.log('Game started successfully');
});

// 12. Check server availability
api.ping(function(error, isAvailable) {
    if (error) {
        console.error('Error:', error.message);
        return;
    }
    console.log('API available:', isAvailable);
});

// 13. Complex example with nested calls
function main() {
    console.log('=== Game Store API Demo ===');
    
    api.ping(function(error, isAvailable) {
        if (error || !isAvailable) {
            console.error('API server is not available!');
            return;
        }
        console.log('API is available');
        
        api.getVersion(function(error, result) {
            if (error) {
                console.error('Failed to get version:', error.message);
                return;
            }
            console.log('API Version:', result.version);
            
            api.getBalance(function(error, result) {
                if (error) {
                    console.error('Failed to get balance:', error.message);
                    return;
                }
                console.log('Current balance:', result.balance);
                
                api.getNickname(function(error, result) {
                    if (error) {
                        console.error('Failed to get nickname:', error.message);
                        return;
                    }
                    console.log('Current nickname:', result.nickname);
                });
            });
        });
    });
}

if (typeof window !== 'undefined') {
    window.GameStoreAPI = GameStoreAPI;
}
