(function() {
    'use strict';
    const _0x = [
        '4|2|0|3|1', '0|3|4|1|2', 'split', 'http://localhost:27765/api/checkLicense/',
        'GET', 'application/json', 'isPurchased', 'version', 'purchaseDate',
        'gameId', 'success', 'error', '5|1|3|0|2|4', 'console', 'log'
    ];
    
    function _0x1(_0x2, _0x3) {
        _0x2 = _0x2 - 0;
        let _0x4 = _0x_[_0x2];
        return _0x4;
    }
    
    function _0x5(_0x6) {
        const _0x7 = _0x1;
        let _0x8 = '';
        for (let _0x9 = 0; _0x9 < _0x6.length; _0x9++) {
            _0x8 += String.fromCharCode(_0x6.charCodeAt(_0x9) ^ 0x5A);
        }
        return _0x8;
    }
    
    function _0xa(_0xb) {
        const _0xc = _0x1;
        let _0xd = '';
        for (let _0xe = _0xb.length - 1; _0xe >= 0; _0xe--) {
            _0xd += _0xb[_0xe];
        }
        return _0xd;
    }
    
    function _0xf(_0x10) {
        const _0x11 = _0x1;
        let _0x12 = '';
        for (let _0x13 = 0; _0x13 < _0x10.length; _0x13++) {
            _0x12 += String.fromCharCode(_0x10.charCodeAt(_0x13) + 0x1);
        }
        return _0x12;
    }
    
    function _0x14() {
        const _0x15 = _0x1;
        const _0x16 = new Date();
        debugger;
        const _0x17 = new Date();
        return (_0x17 - _0x16) > 100;
    }
    
    function _0x18(_0x19) {
        const _0x1a = _0x1;
        return 'http://localhost:27765/api/checkLicense/' + _0x19;
    }
    
    if (_0x14()) {
        try {

        } catch(_0x1b) {}
    }
  
    const _0x1c = function() {
        const _0x1d = _0x1;
        
        this._0x1e = function(_0x1f) {
            const _0x20 = _0x1;
            return _0x18(_0x1f);
        };
        
        this._0x21 = function(_0x22) {
            const _0x23 = _0x1;
            return new Promise((_0x24, _0x25) => {
                const _0x26 = this._0x1e(_0x22);
                fetch(_0x26, {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json' 
                    }
                })
                .then(_0x27 => {
                    if (!_0x27.ok) {
                        throw new Error('HTTP ' + _0x27.status);
                    }
                    return _0x27.json();
                })
                .then(_0x28 => _0x24(_0x28))
                .catch(_0x29 => _0x25(_0x29));
            });
        };
    };

    const _0x2a = (function() {
        const _0x2b = _0x1;
        const _0x2c = new _0x1c();
        
        function _0x2d(_0x2e) {
            const _0x2f = _0x1;
            const _0x30 = _0x2e || '';
            const _0x31 = _0xf(_0x30);
            return _0x2c._0x21(_0x31);
        }
        
        function _0x32(_0x33) {
            const _0x34 = _0x1;
            try {
                const _0x35 = _0x33 || '';
                const _0x36 = _0x5(_0x35);
                return _0x2c._0x21(_0x36);
            } catch (_0x37) {
                return { 
                    success: false, 
                    error: 'system_error' 
                };
            }
        }
        
        return {
            _0x38: function(_0x39) {
                const _0x3a = _0x1;
                return _0x32(_0x39);
            },
            _0x3b: function(_0x3c) {
                const _0x3d = _0x1;
                return _0x2d(_0x3c);
            }
        };
    })();
      
    const _0x3e = {
        _0x3f: {},
        _0x40: function(_0x41, _0x42) {
            const _0x43 = _0x1;
            this._0x3f[_0x41] = _0x42;
            setTimeout(() => {
                delete this._0x3f[_0x41];
            }, 30000);
        },
        _0x44: function(_0x45) {
            const _0x46 = _0x1;
            return this._0x3f[_0x45] || null;
        }
    };
  
    /**
     * ПРОВЕРКА ПОКУПКИ ИГРЫ
     * @param {string} gameId - ИДЕНТИФИКАТОР ИГРЫ
     * @returns {Promise<Object>} - { isPurchased, version, purchaseDate }
     */
    window.checkGamePurchase = async function(gameId) {
        if (!gameId || typeof gameId !== 'string') {
            return {
                isPurchased: false,
                version: '0.0.0',
                purchaseDate: null,
                error: 'INVALID_GAME_ID'
            };
        }
        
        try {
            const _0x47 = _0x3e._0x44(gameId);
            if (_0x47) {
                return _0x47;
            }
            
            const _0x48 = await _0x2a._0x38(gameId);
            
            const _0x49 = {
                isPurchased: _0x48.isPurchased || false,
                version: _0x48.version || '0.0.0',
                purchaseDate: _0x48.purchaseDate || null,
                _0x4a: _0x48.success !== false
            };
            
            _0x3e._0x40(gameId, _0x49);
            
            return _0x49;
            
        } catch (_0x4b) {
            return {
                isPurchased: false,
                version: '0.0.0',
                purchaseDate: null,
                error: 'NETWORK_ERROR'
            };
        }
    };
  
    if (window.checkGamePurchase && window.checkGamePurchase._0x50) {

    } else {
        window.checkGamePurchase._0x50 = true;
        window.checkGamePurchase._0x51 = '1.0.0';
    }
    
})();

/*
// ПРОВЕРКА ПОКУПКИ ИГРЫ - МАКСИМАЛЬНО ПРОСТО
const license = await checkGamePurchase('my-game-id');

if (license.isPurchased) {
    console.log('ИГРА КУПЛЕНА! Версия:', license.version);
    // ЗАПУСКАЕМ ИГРУ
    startGame();
} else {
    console.log('ИГРА НЕ КУПЛЕНА!');
    alert('КУПИТЕ ИГРУ В ЛАУНЧЕРЕ!');
    // ЗАКРЫВАЕМ ИГРУ
    window.close();
}

// ИЛИ С ДЕСТРУКТУРИЗАЦИЕЙ
const { isPurchased, version } = await checkGamePurchase('my-game');
if (isPurchased) {
    console.log(`Запуск игры версии ${version}`);
    startGame();
}
*/
