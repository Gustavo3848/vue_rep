<template>
    <div class="row">
        <div class="col p-2">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <h1 class="card-title fs-5">LOTES EMPENHADOS</h1>
                        </div>
                        <div class="col text-end">
                            <div class="btn-group" role="group" aria-label="Basic outlined example">
                                <button type="button" class="btn btn-sm btn-outline-success" @click="addRow()"><i
                                        class="bi bi-plus-lg"></i></button>
                                <button type="button" class="btn btn-sm btn-outline-danger" @keyup.delete="deleteRow()"
                                    @click="deleteRow()"><i class="bi bi-trash3"></i></button>
                            </div>
                        </div>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Lote</th>
                                <th>Quantidade</th>
                                <th>Local</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr id="1" v-for="(row) in rows" :key="row.id" @click="mark(row.id)" :class="row.style">
                                <td><input type="text" v-model="row.produto" maxlength="5"
                                        @keyup.f2="consultaPadrao()"></td>
                                <td><input type="text" v-model="row.lote" maxlength="10"></td>
                                <td><input type="number" class="text-end" v-model="row.quantidade" step=".0001">
                                </td>
                                <td><input type="text" v-model="row.local" maxlength="2"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="row">
                        <div class="col-10 text-end">
                            <h3 class="fs-5">TOTAL EMPENHADO</h3>
                        </div>
                        <div class="col-2 text-end">
                            <h3 class="fs-5">{{ $filters.sldFilter(totalRow(this.rows)) }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col p-2">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <h1 class="card-title fs-5">LOTES RESULTADO</h1>
                        </div>
                        <div class="col text-end">
                            <div class="btn-group" role="group" aria-label="Basic outlined example">
                                <button type="button" class="btn btn-sm btn-outline-success" @click="addRowRes()"><i
                                        class="bi bi-plus-lg"></i></button>
                                <button type="button" class="btn btn-sm btn-outline-danger" @keyup.delete="deleteRowRes()"
                                    @click="deleteRowRes()"><i class="bi bi-trash3"></i></button>
                            </div>
                        </div>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Lote</th>
                                <th>Quantidade</th>
                                <th>Local</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr id="1" v-for="(row) in rowsRes" :key="row.id" @click="markRes(row.id)" :class="row.style">
                                <td><input type="text" v-model="row.produto" maxlength="5"></td>
                                <td><input type="text" v-model="row.lote" maxlength="10"></td>
                                <td><input type="number" class="text-end" v-model="row.quantidade" step=".0001">
                                </td>
                                <td><input type="text" v-model="row.local" maxlength="2"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="row">
                        <div class="col-10 text-end">
                            <h3 class="fs-5">TOTAL RESULTADO</h3>
                        </div>
                        <div class="col-2 text-end">
                            <h3 class="fs-5">{{ $filters.sldFilter(totalRow(this.rowsRes)) }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <consultaPadrao v-show="isModalVisible" @close="closeModal" @select="select" :lotes="lotes"></consultaPadrao>
    </div>
</template>
<script>
import consultaPadrao from './consultaPadrao.vue'
import axios from 'axios'
export default {
    name: 'itensOS',
    components: {
        consultaPadrao
    },
    props: ["emp", "res"]
    ,
    data() {
        return {
            index: 0,
            indexRes: 0,
            totalQtdRows: 0,
            rows: this.emp,
            rowsRes: this.res,
            isModalVisible: false,
            return: {},
            lotes: [],
            locais: []
        }
    },
    methods: {
        mark(id) {
            this.rows.forEach(row => {
                if (id == row.id) {
                    if (row.select != true) {
                        row.select = true
                        row.style = "table-secondary input"
                    } else {
                        row.select = false
                        row.style = ""
                    }
                } else {
                    row.select = false
                    row.style = ""
                }
            });
        },
        addRow() {
            if (this.validNewRow(this.rows)) {
                this.rows.push({
                    id: this.index++,
                    produto: "",
                    lote: "",
                    quantidade: 0,
                    local: "",
                    select: false,
                    style: ""
                })
            }
        },
        validNewRow(rows) {
            var lRet = true
            rows.forEach(rows => {
                if ((rows.produto | rows.lote | rows.quantidade | rows.local) == "" | 0) {
                    lRet = false
                }
            });
            return lRet
        },
        totalRow(rows) {
            let qtd = 0
            rows.forEach(element => {
                qtd += element.quantidade
            });
            return qtd
        },
        deleteRow() {
            var index = 0
            this.rows.forEach(row => {
                if (row.select === true) {
                    this.rows.splice(index++, 1)
                }
                index++
            });
        },
        consultaPadrao() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        select(payload) {
            this.rows.forEach(row => {
                if (row.select == true) {
                    row.produto = payload.produto
                    row.lote = payload.lote
                    row.quantidade = payload.quantidade
                    row.local = payload.local
                }
            });
        },
        getItens() {
            this.$emit('getItens', {
                name: "teste"
            })
        },
        addRowRes() {
            if (this.validNewRow(this.rowsRes)) {
                this.rowsRes.push({
                    id: this.indexRes++,
                    produto: "",
                    lote: "",
                    quantidade: 0,
                    local: "",
                    select: false,
                    style: ""
                })
            }
        },
        markRes(id) {
            this.rowsRes.forEach(row => {
                if (id == row.id) {
                    if (row.select != true) {
                        row.select = true
                        row.style = "table-secondary input"
                    } else {
                        row.select = false
                        row.style = ""
                    }
                } else {
                    row.select = false
                    row.style = ""
                }
            });
        },
        deleteRowRes() {
            var index = 0
            this.rowsRes.forEach(row => {
                if (row.select === true) {
                    this.rowsRes.splice(index++, 1)
                }
                index++
            });
        }
    },
    mounted() {
        axios.get('http://localhost:9988/app/lotes/FA04')
            .then((response) => {
                this.lotes = response.data.data
            }).catch(error => {
                console.log(error);
            });
    }
}
</script>
<style>
.input>td>input {
    pointer-events: none;
}

tr>td>input {
    width: 100%;
}

tr>td {
    width: 25%;
}
</style>