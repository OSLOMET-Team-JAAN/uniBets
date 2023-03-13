import React from "react";
import MyTable from "../components/table/MyTable";
import useCSV from '../hooks/useCSV';
import useCSVHeaders from "../hooks/useCSVHeaders";
const UserPage = () => {
    const { data }: any = useCSV();
    const { csvHeaders }: any = useCSVHeaders();

    return (
        <div>
            <h3>USER PAGE HERE</h3>
            <MyTable
                columns={csvHeaders}
                rows={data}/>
        </div>
    );
};

export default UserPage;