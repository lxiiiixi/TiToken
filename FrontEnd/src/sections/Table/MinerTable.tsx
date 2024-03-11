import React from "react";
import { Table } from "antd";

const { Column, ColumnGroup } = Table;

export interface MinerDataType {
    key: React.Key;
    tRank: number;
    length: number;
    startDay: number;
    endDay: number;
    power: number;
    estToken: number;
    tRankBonus: number;
    cost: number;
    value: number;
    roi: number;
    progress: number;
    share: number;
    action: number;
}

const MinerTable = ({ data }: { data: MinerDataType[] }) => (
    <div className="rounded-lg overflow-hidden text-xs">
        <Table
            dataSource={data}
            scroll={{ x: 1200 }}
            bordered
            pagination={false}
            className="antd-costom"
            summary={data => {
                let estTokenAmount = 0;
                let tRankBonus = 0;
                let cost = 0;
                let value = 0;
                let roi = 0;

                data.forEach(
                    ({
                        estToken,
                        tRankBonus: _tRankBonus,
                        cost: _cost,
                        value: _value,
                        roi: _roi,
                    }) => {
                        estTokenAmount += estToken;
                        tRankBonus += _tRankBonus;
                        cost += _cost;
                        value += _value;
                        roi += _roi;
                    }
                );
                return (
                    <>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>{estTokenAmount}</Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>{tRankBonus}</Table.Summary.Cell>
                            <Table.Summary.Cell index={3}> {cost} </Table.Summary.Cell>
                            <Table.Summary.Cell index={4}> {value} </Table.Summary.Cell>
                            <Table.Summary.Cell index={4}> {roi} </Table.Summary.Cell>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                );
            }}
        >
            <Column title="tRank" dataIndex="tRank" key="tRank" />
            <ColumnGroup title="Miner Details">
                <Column title="Length" dataIndex="length" key="length" />
                <Column title="Start Day" dataIndex="startDay" key="startDay" />
                <Column title="End Day" dataIndex="endDay" key="endDay" />
                <Column title="Power" dataIndex="power" key="power" />
            </ColumnGroup>
            <Column title="Est. TITANX" dataIndex="estToken" key="estToken" />
            <Column title="~ tRank Bonus" dataIndex="tRankBonus" key="tRankBonus" />
            <ColumnGroup title="Miner ROI">
                <Column title="Cost" dataIndex="cost" key="cost" />
                <Column title="$ Value" dataIndex="value" key="value" />
                <Column title="% ROI" dataIndex="roi" key="roi" />
            </ColumnGroup>
            <Column title="Progress" dataIndex="progress" key="progress" />
            <Column title="Share" dataIndex="share" key="share" />
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

export default MinerTable;
