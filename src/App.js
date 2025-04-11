import React, { useState } from 'react';
import './App.css';

function App() {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setError('');
        setUserData(null);
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error('User not found');
            }
            const data = await response.json();
            setUserData(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="App">
            <h1>GitHub 用户搜索</h1>
            <input
                type="text"
                placeholder="输入 GitHub 用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleSearch}>搜索</button>

            {error && <p className="error">{error}</p>}
            {userData && (
                <div className="user-info">
                    <img src={userData.avatar_url} alt={`${userData.login} 的头像`} />
                    <h2>{userData.login}</h2>
                    <p>公共仓库数量: {userData.public_repos}</p>
                </div>
            )}
        </div>
    );
}

export default App;