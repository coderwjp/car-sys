<template>
    <div>
        <div class="container">
            <el-table
                :data="tableData"
                
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="state" label="紧急" width="100" align="center" fixed
                :filters="[{ text: '紧急', value: '紧急' }, { text: '一般', value: '一般' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag effect="dark"
                        :type="scope.row.state === '成功' ? 'danger' : 'warning'"
                        disable-transitions>{{scope.row.state === '成功' ? '紧急' : '一般'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="用车单位" width="100"></el-table-column>
                <el-table-column prop="date" label="用车时间" width="100"></el-table-column>
                <el-table-column prop="address" label="候车地" width="100"></el-table-column>
                <el-table-column prop="address" label="目的地" width="200"></el-table-column>
                <el-table-column prop="address" label="事由" width="200"></el-table-column>
                <el-table-column prop="name" label="用车人" width="100"></el-table-column>
                <el-table-column prop="" label="电话" width="100"></el-table-column>
                <el-table-column prop="name" label="乘车人" width="100"></el-table-column>
                <el-table-column prop="" label="电话" width="100"></el-table-column>

                <el-table-column label="操作" 
                        fixed="right"
                        width="100" 
                        align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >调度</el-button>
                        
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
// import { request } from 'network/request';
import { getTableData } from '../../api/index';

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {

            getTableData(this.query).then(res => {
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
            
        },
        resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
        clearFilter() {
            this.$refs.filterTable.clearFilter();
        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 12px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
