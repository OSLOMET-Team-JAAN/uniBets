import React from "react";
import MyTable from "../components/table/MyTable";
import useCSV from "../hooks/useCSV";

const UserPage = () => {
    const {data, headers}: any = useCSV();
    return (
        <div>
            <h3>USER PAGE HERE</h3>
            <MyTable
                columns={headers}
                rows={data}/>
        </div>
    );
};

export default UserPage;