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
                                        @keyup.f1="consultaPadrao('produto', row.id)"></td>
                                <td><input type="text" v-model="row.lote" maxlength="10"></td>
                                <td><input type="text" class="text-end" v-model="row.quantidade" v-money3="config"></td>
                                <td><input type="text" v-model="row.local" maxlength="2"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="row">
                        <div class="col-10 text-end">
                            <h3 class="fs-5">TOTAL EMPENHADO</h3>
                        </div>
                        <div class="col-2 text-end">
                            <h3 class="fs-5">{{ totalRow() }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col p-2">
            <div class="card">
                <div class="card-body">
                    <h1 class="card-title fs-5">LOTES RESULTADO</h1>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Lote</th>
                                <th class="text-center">Quantidade</th>
                                <th class="text-center">Local</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>02087</td>
                                <td>E-22300</td>
                                <td class="text-end">18,0000</td>
                                <td class="text-center">01</td>
                            </tr>
                            <tr>
                                <td>02087</td>
                                <td>E-22300</td>
                                <td class="text-end">18,0000</td>
                                <td class="text-center">01</td>
                            </tr>
                            <tr>
                                <td>02087</td>
                                <td>E-22300</td>
                                <td class="text-end">18,0000</td>
                                <td class="text-center">01</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="row">
                        <div class="col-10 text-end">
                            <h3 class="fs-5">TOTAL RESULTADO</h3>
                        </div>
                        <div class="col-2 text-end">
                            <h3 class="fs-5">18,0000</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <consultaPadrao v-show="isModalVisible" @close="closeModal" @select="select"></consultaPadrao>
    </div>
</template>
<script>
import consultaPadrao from './consultaPadrao.vue'
import { Money3Directive, format} from 'v-money3'
export default {
    name: 'itensOS',
    components: {
        consultaPadrao
    },
    data() {
        return {
            index: 0,
            rows: [],
            totalQtdRows: 0,
            isModalVisible: false,
            return: {},
            config: {
                masked: true,
                prefix: '',
                suffix: '',
                thousands: '.',
                decimal: ',',
                precision: 4,
                disableNegative: false,
                disabled: false,
                min: null,
                max: null,
                allowBlank: false,
                minimumNumberOfCharacters: 0,
                shouldround: false
            }
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
        totalRow() {
            let qtdTotal = 0
            this.rows.forEach(row => {
                console.log(parseFloat(row.quantidade).toFixed(4))
                qtdTotal += row.quantidade
            });
            return format(qtdTotal,this.config)
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
        consultaPadrao(table, id) {
            console.log(table + id)
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
        }
    },
    directives: { money3: Money3Directive }
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