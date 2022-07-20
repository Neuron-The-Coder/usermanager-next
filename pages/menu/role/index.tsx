import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import useSWR from 'swr';
import Dashboard, { IInteractiveUtils } from '../../../components/dashboard/dashboard';
import Icon from '../../../components/utils/icon';
import { Auth } from '../../../utilities/authentication';
import styles from './role.module.scss';
import rowStyles from './roleRow.module.scss';

interface IRoleData {
  ID: number,
  Name: string
}

interface IRoleRowData {
  name: string
}

export async function getServerSideProps() {
  if (!(await Auth(Cookies.get('Token')) ?? "")) return {
    redirect : {
      destination : '/auth/login'
    }
  } 

  else return {
    props : { }
  }
}

export default function Index() {
  // Fetcher = Ambil data kek aman gitoe. Untuk fetch data aje ye
  const fetcher = (url: RequestInfo | URL) => fetch(url).then(res => res.json());
  const { data, error, mutate } = useSWR<IRoleData[]>('/api/role/getAllRoles', fetcher);
  const refresh = () => { mutate(data, true) }

  let component: JSX.Element | null = null;
  if (error) component = (<p>Error</p>);
  else if (!data) {
    // interactive.showLoading();
    component = (<p>Loading</p>)
  }

  else {
    // interactive.closeInteractive();
    component = (
      <>
        <h1 className={styles.title}>Manage Roles</h1>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <td width="10%">No</td>
              <td width="70%">Name</td>
              <td width="20%">Actions</td>
            </tr>
          </thead>
          <tbody>
            {
              data.map((r, idx) => (
                <RoleRow key={idx} num={idx} role={r} refresh={refresh}></RoleRow>
              ))
            }
            <RoleAddRow refresh={refresh} interactive={null} />
          </tbody>
        </table>
      </>
    )
  }

  return (
    <Dashboard>
      {component}
    </Dashboard>
  )
}

function RoleAddRow({ refresh, interactive }: { refresh(): void, interactive: IInteractiveUtils | null }) {

  const [isAdd, setIsAdd] = useState(false);
  const [roleAddRowData, setRoleAddRowData] = useState<IRoleRowData>({
    name: ""
  });

  async function sendAddRoleRow() {

    if (roleAddRowData.name.length == 0) {
      return
    }

    // interactive.showLoading();
    let result = await axios.post('/api/role/addRole', roleAddRowData);

    if (result.status == 200) refresh();
    setIsAdd(false);
    // interactive.closeInteractive();

    setRoleAddRowData({
      name: ""
    });
  }

  if (isAdd) {
    return (
      <tr className={rowStyles.row}>
        <td colSpan={2}>
          <input type="text" name="" id="" className="form-control" placeholder="Name"
            value={roleAddRowData.name}
            onChange={(e) => { setRoleAddRowData({ name: e.target.value }) }} />
        </td>
        <td>
          <div className={rowStyles.actions}>
            <button className={rowStyles.delete + ' btn btn-success'} type="button"
              onClick={() => { sendAddRoleRow() }}>
              Ok
            </button>
            <button className={rowStyles.delete + ' btn btn-danger'} type="button"
              onClick={() => { setIsAdd(false) }}>
              Cancel
            </button>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tr className={rowStyles.row}>
      <td colSpan={4}>
        <button type="button" className="btn btn-primary w-100" onClick={() => { setIsAdd(true) }}>Add New Role</button>
      </td>
    </tr>
  )

}

function RoleRow({ num, role, refresh }: { num: number, role: IRoleData, refresh(): void }) {

  const [isDelete, setIsDeleted] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [roleUpdateRowData, setRoleUpdateRowData] = useState<IRoleRowData>({
    name: role.Name
  });

  const deleteRole = async () => {

    const result = await axios.post('/api/role/deleteRole', {
      ID: role.ID
    });

    refresh();
  }

  const sendUpdateRoleRow = async () => {

    if (roleUpdateRowData.name.length == 0) {
      return;
    }

    const results = await axios.post('/api/role/updateRole', {
      ID: role.ID,
      name: roleUpdateRowData.name
    });

    refresh();
    setIsUpdate(false);
  }

  if (isDelete) {
    return (
      <tr className={rowStyles.row}>
        <td colSpan={2} className={rowStyles.rowDelete}>
          <p>Are you sure?</p>
        </td>
        <td>
          <div className={rowStyles.actions}>
            <button className={rowStyles.delete + ' btn btn-danger'} type="button"
              onClick={() => { deleteRole() }}>
              Yes
            </button>
            <button className={rowStyles.delete + ' btn btn-primary'} type="button"
              onClick={() => { setIsDeleted(false) }}>
              No
            </button>
          </div>
        </td>
      </tr>
    )
  }

  else if (isUpdate) {
    return (
      <tr className={rowStyles.row}>
        <td colSpan={2}>
          <input type="text" name="" id="" className="form-control" placeholder="Name"
            value={roleUpdateRowData.name}
            onChange={(e) => { setRoleUpdateRowData({ name: e.target.value }) }} />
        </td>
        <td>
          <div className={rowStyles.actions}>
            <button className={rowStyles.delete + ' btn btn-success'} type="button"
              onClick={() => { sendUpdateRoleRow() }}>
              Ok
            </button>
            <button className={rowStyles.delete + ' btn btn-danger'} type="button"
              onClick={() => {
                setIsUpdate(false)
              }}>
              Cancel
            </button>
          </div>
        </td>
      </tr>
    );
  }

  else return (
    <tr key={num + 1} className={rowStyles.row}>
      <td>{num + 1}</td>
      <td>{role.Name}</td>
      <td>
        <div className={rowStyles.actions}>
          <p className={rowStyles.delete + ' btn btn-primary'} onClick={() => { setIsUpdate(true) }}>
            <Icon icon="bi bi-pencil" />
          </p>
          <p className={rowStyles.delete + ' btn btn-danger'} onClick={() => { setIsDeleted(true) }}>
            <Icon icon="bi bi-trash" />
          </p>
        </div>
      </td>
    </tr>
  )
}