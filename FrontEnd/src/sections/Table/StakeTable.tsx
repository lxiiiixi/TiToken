import React from "react";
import { Table } from "antd";

const { Column, ColumnGroup } = Table;

interface DataType {
    key: React.Key;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    tags: string[];
}

const data: DataType[] = [];

const StakeTable: React.FC = () => (
    <Table dataSource={data} scroll={{ x: 1600 }} bordered footer={() => <></>}>
        <Column title="stakeID" dataIndex="stakeID" key="stakeID" />
        <ColumnGroup title="Stake Details">
            <Column title="Length" dataIndex="length" key="length" />
            <Column title="Start Day" dataIndex="startDay" key="startDay" />
            <Column title="End Day" dataIndex="endDay" key="endDay" />
        </ColumnGroup>
        <Column title="TITANX Staked" dataIndex="tokenStaked" key="tokenStaked" />
        <ColumnGroup title="Stake Shares">
            <Column title="Eff. Share Rate" dataIndex="shareRate" key="shareRate" />
            <Column title="Shares" dataIndex="shares" key="shares" />
            <Column title="Value" dataIndex="value" key="value" />
        </ColumnGroup>
        <Column title="Progress" dataIndex="progress" key="progress" />
        <Column title="Action" dataIndex="action" key="action" />

        {/* <Column
            title="Tags"
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={(tags: string[]) => (
                <>
                    {tags.map(tag => (
                        <Tag color="blue" key={tag}>
                            {tag}
                        </Tag>
                    ))}
                </>
            )}
        /> */}
    </Table>
);

export default StakeTable;
