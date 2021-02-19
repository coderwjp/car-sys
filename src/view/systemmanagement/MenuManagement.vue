<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.address" placeholder="父节点" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="菜单名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <div class="right-btn">   
                    <el-button type="primary"  class="el-icon-lx-add" @click="handleAdd">新增</el-button>
                    <!-- <el-button type="primary" icon="el-icon-search" @click="handleSearch">导出</el-button> -->
                </div>
            </div>
            <el-table
                :data="tableData"
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="菜单名"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column prop="address" label="图标"></el-table-column>
                <el-table-column prop="address" label="级别"></el-table-column>
                <el-table-column prop="address" label="父节点"></el-table-column>
                <el-table-column prop="address" label="排序"></el-table-column>
                <el-table-column prop="address" label="备注"></el-table-column>
                
                <el-table-column label="操作"
                            fixed="right"
                             width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
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

        <el-drawer
            :title="titlename"
            :before-close="handleClose"
            :visible.sync="dialog"
            direction="btt"
            size="60%"
            custom-class="demo-drawer"
            ref="drawer"
            >
            <div class="demo-drawer__content">
                <el-form :model="form" size="mini" >

                    <el-row :gutter="20">
                        <el-col :span="10">
                            <el-form-item label="活动名称" placeholder="请选择活动区域" :label-width="formLabelWidth">
                                <el-input v-model="form.name" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="活动名称" placeholder="请选择活动区域" :label-width="formLabelWidth">
                                <el-input v-model="form.name" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="活动名称" placeholder="请选择活动区域" :label-width="formLabelWidth">
                                <el-input v-model="form.name" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="活动名称" placeholder="请选择活动区域" :label-width="formLabelWidth">
                                <el-input v-model="form.name" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="活动名称" placeholder="请选择活动区域" :label-width="formLabelWidth">
                                <el-input v-model="form.name" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                  
                </el-form>
                <el-row :gutter="20">
                     <el-col :span="20">
                        <div class="right-btn">
                        <el-button @click="cancelForm">取 消</el-button>
                        <el-button type="primary" @click="$refs.drawer.closeDrawer()" 
                                    :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                        </div>

                     </el-col>
                </el-row>
                
            </div>
            </el-drawer>
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
            title:true,
            dialog: false,
            loading: false,
            timer: null,
            formLabelWidth:'100px' ,
            form:{},
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
    computed:{
        titlename(){
            return this.title ? '新增菜单':'修改菜单';
        }
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {

            getTableData(this.query).then(res => {
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
            
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
         handleAdd() {
             this.title = true;
             this.dialog = true;
         },
         handleEdit(index, row) {
             this.title = false;
             this.dialog = true;
         },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
         handleClose(done) {
            if (this.loading) {
                return;
            }
            this.$confirm('确定要提交表单吗？')
                .then(_ => {
                    this.loading = true;
                    this.timer = setTimeout(() => {
                        done();
                        // 动画关闭需要一定的时间
                        setTimeout(() => {
                        this.loading = false;
                        }, 400);
                    }, 2000);
                })
                .catch(_ => {
                    this.cancelForm();
                });
            },
            cancelForm() {
                this.loading = false;
                this.dialog = false;
                clearTimeout(this.timer);
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
