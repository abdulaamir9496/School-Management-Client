import { useAuth } from '../context/AuthContext';

const TestAuthStatus = () => {
    const { currentUser, loading, error, authChecked } = useAuth();

    return (
        <div className="p-4 m-4 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Authentication Status Debugger</h2>

            <div className="mb-4">
                <strong>Loading:</strong> {loading ? 'True' : 'False'}
            </div>

            <div className="mb-4">
                <strong>Auth Checked:</strong> {authChecked ? 'True' : 'False'}
            </div>

            <div className="mb-4">
                <strong>User Authenticated:</strong> {currentUser ? 'Yes' : 'No'}
            </div>

            {error && (
                <div className="mb-4 text-red-500">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {currentUser && (
                <div className="mb-4">
                    <strong>User Info:</strong>
                    <pre className="bg-gray-100 p-2 rounded mt-2">
                        {JSON.stringify(currentUser, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default TestAuthStatus;