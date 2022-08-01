import UsersList from "./components/UsersList"
import { USERS_LIST } from "./constants/users-list"

const App = () => {
  return <UsersList initialUsers={USERS_LIST} />
}

export default App
