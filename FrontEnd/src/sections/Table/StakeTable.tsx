import React from "react";
import { Table } from "antd";

const { Column, ColumnGroup } = Table;

export interface StakeDataType {
    key: React.Key;
    stakeID: string;
    length: number;
    startDay: number;
    endDay: number;
    tokenStaked: number;
    shareRate: number;
    shares: number;
    value: number;
    progress: number;
}

const data: StakeDataType[] = [];

const StakeTable: React.FC = () => (
    <div className="rounded-lg overflow-hidden text-xs">
        <Table
            dataSource={data}
            scroll={{ x: 1200 }}
            bordered
            pagination={false}
            className="antd-costom"
            summary={data => {
                let estTokenAmount = 0;
                let shareRate = 0;
                let shares = 0;
                let value = 0;

                data.forEach(
                    ({ tokenStaked, shareRate: _shareRate, shares: _shares, value: _value }) => {
                        estTokenAmount += tokenStaked;
                        shareRate += _shareRate;
                        shares += _shares;
                        value += _value;
                    }
                );
                return (
                    <>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>{estTokenAmount}</Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>{shareRate}</Table.Summary.Cell>
                            <Table.Summary.Cell index={3}> {shares} </Table.Summary.Cell>
                            <Table.Summary.Cell index={4}> {value} </Table.Summary.Cell>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                );
            }}
        >
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
    </div>
);

export default StakeTable;
