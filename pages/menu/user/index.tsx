import Dashboard, { IInteractiveUtils } from "../../../components/dashboard/dashboard";
import useSWR, { BareFetcher } from "swr";
import styles from './user.module.scss';
import rowStyles from './userRow.module.scss';
import Icon from "../../../components/utils/icon";
import { useState } from "react";
import axios from "axios";

interface IUserData {
  Username : string,
  Email : string,
  ID : number,
}

interface IUserRowData {
  username : string,
  email : string
}

export default function Index({ interactive } : { interactive : IInteractiveUtils }) {

  // Fetcher = Ambil data kek aman gitoe. Untuk fetch data aje ye
  const fetcher = (url: RequestInfo | URL) => fetch(url).then(res => res.json());
  const { data, error, mutate } = useSWR<IUserData[]>('/api/user/getAllUsers', fetcher);
  const refresh = () => { mutate(data, true) }

  let component : JSX.Element | null = null;
  if (error) component = (<p>Error</p>);
  else if (!data) {
    // interactive.showLoading();
    component = (<p>Loading</p>)
  }

  else {
    // interactive.closeInteractive();
    component = (
      <>
        <h1 className={ styles.title }>Manage Users</h1>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <td width="10%">No</td>
              <td width="35%">Name</td>
              <td width="35%">Email</td>
              <td width="20%">Actions</td>
            </tr>
          </thead>
          <tbody>
            {
              data.map((u, idx) => (
                <UserRow key={ idx } num={ idx } user={ u } refresh={ refresh }></UserRow>
              ))
            }
            <UserAddRow refresh={ refresh } interactive={ interactive }/>
          </tbody>
        </table>
      </>
    )
  }

  return (
    <Dashboard>
      { component }
    </Dashboard>
  )
}

function UserAddRow({ refresh, interactive } : { refresh() : void, interactive : IInteractiveUtils }){
  
  const [isAdd, setIsAdd] = useState(false);
  const [userAddRowData, setUserAddRowData] = useState<IUserRowData>({
    email : "",
    username : ""
  });

  async function sendAddUserRow(){

    if (userAddRowData.email.length == 0 || 
        userAddRowData.username.length == 0 || 
        (/[a-zA-Z0-9]+@[a-z]+\.com/g).test(userAddRowData.email) == false){
      return
    }

    // interactive.showLoading();
    let result = await axios.post('/api/user/addUser', userAddRowData);
    
    if (result.status == 200) refresh();
    setIsAdd(false);
    // interactive.closeInteractive();

    setUserAddRowData({
      username : "",
      email : ""
    });
  }

  if (isAdd){
    return (
      <tr className={ rowStyles.row }>
        <td colSpan={2}>
          <input type="text" name="" id="" className="form-control" placeholder="Name" 
            value={ userAddRowData.username } 
            onChange={ (e) => { setUserAddRowData({ ...userAddRowData, username : e.target.value }) } }/>
        </td>
        <td>
          <input type="email" name="" id="" className="form-control" placeholder="Email"
            value={ userAddRowData.email } 
            onChange={ (e) => { setUserAddRowData({ ...userAddRowData, email : e.target.value }) } }/>
        </td>
        <td>
          <div className={ rowStyles.actions }>
            <button className={ rowStyles.delete + ' btn btn-success' } type="button"
              onClick={ () => { sendAddUserRow() } }>
              Ok
            </button>
            <button className={ rowStyles.delete + ' btn btn-danger' } type="button"
              onClick={ () => { setIsAdd(false) } }>
              Cancel
            </button>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tr className={ rowStyles.row }>
      <td colSpan={4}>
        <button type="button" className="btn btn-primary w-100" onClick={ () => { setIsAdd(true) }}>Add New User</button>
      </td>
    </tr>
  )

}

function UserRow({ num, user, refresh } : { num : number, user : IUserData, refresh() : void }){
  
  const [isDelete, setIsDeleted] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  
  const [userUpdateRowData, setUserUpdateRowData] = useState<IUserRowData>({
    email : user.Email,
    username : user.Username
  });

  const deleteUser = async () => {
    
    const result = await axios.post('/api/user/deleteUser', {
      ID : user.ID
    });

    refresh();
  }

  const sendUpdateUserRow = async () => {
      
    // if (userUpdateRowData.email.length == 0 || userUpdateRowData.username.length == 0 || (/[a-zA-Z0-9]+@[a-z]+\.com/).test(userUpdateRowData.email) == false){
    //   return;
    // }

    const results = await axios.post('/api/user/updateUser', {
      ...userUpdateRowData,
      ID : user.ID
    });
    
    refresh();
    setIsUpdate(false);
    // setUserUpdateRowData({
    //   email : user.Email,
    //   username : user.Username
    // });

  }

  if (isDelete){
    return(
      <tr className={ rowStyles.row }>
        <td colSpan={3} className={ rowStyles.rowDelete }>
          <p>Are you sure?</p>
        </td>
        <td>
          <div className={ rowStyles.actions }>
            <button className={ rowStyles.delete + ' btn btn-danger' } type="button"
              onClick={ () => { deleteUser() } }>
              Yes
            </button>
            <button className={ rowStyles.delete + ' btn btn-primary' } type="button"
              onClick={ () => { setIsDeleted(false) } }>
              No
            </button>
          </div>
        </td>
      </tr>
    )
  }
  
  else if (isUpdate){
    return (
      <tr className={ rowStyles.row }>
        <td colSpan={2}>
          <input type="text" name="" id="" className="form-control" placeholder="Name" 
            value={ userUpdateRowData.username } 
            onChange={ (e) => { setUserUpdateRowData({ ...userUpdateRowData, username : e.target.value }) } }/>
        </td>
        <td>
          <input type="email" name="" id="" className="form-control" placeholder="Email"
            value={ userUpdateRowData.email } 
            onChange={ (e) => { setUserUpdateRowData({ ...userUpdateRowData, email : e.target.value }) } }/>
        </td>
        <td>
          <div className={ rowStyles.actions }>
            <button className={ rowStyles.delete + ' btn btn-success' } type="button"
              onClick={ () => { sendUpdateUserRow() } }>
              Ok
            </button>
            <button className={ rowStyles.delete + ' btn btn-danger' } type="button"
              onClick={ () => { 
                setIsUpdate(false) } }>
              Cancel
            </button>
          </div>
        </td>
      </tr>
    );
  }
  
  else return (
    <tr key={ num + 1 } className={ rowStyles.row }>
      <td>{ num + 1 }</td>
      <td>{ user.Username }</td>
      <td>{ user.Email }</td>
      <td>
        <div className={ rowStyles.actions }>
          <p className={ rowStyles.delete + ' btn btn-primary' } onClick={ () => { setIsUpdate(true) } }>
            <Icon icon="bi bi-pencil"/>
          </p>
          <p className={ rowStyles.delete + ' btn btn-danger' } onClick={ () => { setIsDeleted(true) } }>
            <Icon icon="bi bi-trash"/>
          </p>
        </div>
      </td>
    </tr>
  )
}