<template >
    <div class="row">
        <div class="col p-2">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <h1 class="card-title fs-3">ORDEM DE SERVIÇO - {{ cab.filial }}</h1>
                        </div>
                        <div class="col text-end">
                            <button class="btn btn-info" @click="confirmar()">Confirmar</button>
                        </div>
                    </div>
                    <hr>
                    <form class="row g-3">
                        <div class="col-auto">
                            <label for="numOS" class="col-form-label">Filial</label>
                            <input type="texte" v-model="cab.filial" class="form-control form-control-sm" id="cFilial"
                                maxlength="4">
                        </div>
                        <div class="col-auto">
                            <label for="numOS" class="col-form-label">Numero OS</label>
                            <input type="texte" v-model="cab.numeroOS" class="form-control form-control-sm" id="numOS"
                                maxlength="10">
                        </div>
                        <div class="col-auto">
                            <label for="local" class="col-form-label">Local</label>
                            <div class="input-group">
                                <input type="text" v-model="cab.local" @keyup.f2="consultaLocais"
                                    class="form-control form-control-sm" aria-describedby="button-addon2" id="local"
                                    maxlength="2">
                                <button class="btn btn-outline-info btn-sm" type="button" id="button-local"
                                    @click="consultaLocais"><i class="bi bi-search"></i></button>
                            </div>
                        </div>
                        <div class="col-auto">
                            <label for="dtEmissao" class="col-form-label">Dt Emissão</label>
                            <input type="date" v-model="cab.dtEmissao" class="form-control form-control-sm" id="dtEmissao">
                        </div>
                        <div class="col-auto">
                            <label for="prevIni" class="col-form-label">Previsão Ini</label>
                            <input type="date" v-model="cab.dtPrevisao" class="form-control form-control-sm" id="prevIni">
                        </div>
                        <div class="col-auto">
                            <label for="entrega" class="col-form-label">Entrega</label>
                            <input type="date" v-model="cab.dtEntrega" class="form-control form-control-sm" id="entrega">
                        </div>
                        <div class="col-3">
                            <label for="observacao" class="col-form-label">Observação</label>
                            <input type="texte" v-model="cab.observacao" class="form-control form-control-sm"
                                id="observacao" maxlength="254">
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="spin">
            <div v-show="load" class="lds-dual-ring"></div>
        </div>
    </div>
    <itensOS :emp="rowsEmp" :res="rowsRes" :filial="cab.filial" />
    <consultaLocais v-show="isModalVisible" @close="closeModal" @select="select" :locais="locais"></consultaLocais>
</template>
<script>
import itensOS from './itensOS.vue'
import consultaLocais from './consultaLocais.vue'
import axios from 'axios'
export default {
    name: 'cabOS',
    data() {
        return {
            cab: {
                numeroOS: "",
                local: "",
                dtEmissao: "",
                dtPrevisao: "",
                dtEntrega: "",
                observacao: "",
                filial: ""
            },
            rowsEmp: [],
            rowsRes: [],
            totais: { qtdEmp: 0, qtdRes: 0 },
            lotes: [],
            locais: [],
            isModalVisible: false,
            load: false


        }
    },
    components: {
        itensOS,
        consultaLocais
    },
    methods: {
        confirmar() {
            var res = {
                cab: {
                    numeroOS: this.cab.numeroOS,
                    local: this.cab.local,
                    dtEmissao: this.convertDate(this.cab.dtEmissao),
                    dtPrevisao: this.convertDate(this.cab.dtPrevisao),
                    dtEntrega: this.convertDate(this.cab.dtEntrega),
                    observacao: this.cab.observacao,
                    filial: this.cab.filial
                },
                empenhos: this.rowsEmp,
                resultados: this.rowsRes
            }
            this.load = true
            axios.post('http://' + this.$restful + ':9988/app/opexecauto', res)
                .then((response) => {
                    console.log(response)
                    this.load = false
                }).catch(error => {
                    console.log(error);
                    this.load = false
                });

        },
        convertDate(date) {
            let day = date.substring(8, 10);
            let month = date.substring(5, 7);
            let year = date.substring(0, 4);
            return day + "/" + month + "/" + year
        },
        consultaLocais() {
            this.isModalVisible = true;
            this.execfunct()

        },
        closeModal() {
            this.isModalVisible = false;
        },
        select(payload) {
            this.cab.local = payload.local.codigo
        },
        execfunct() {
            axios.get('http://' + this.$restful + ':9988/app/locais/' + this.cab.filial)
                .then((response) => {
                    this.locais = response.data.data
                }).catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>
<style scoped>
.spin {
    position: Absolute;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.lds-dual-ring {
    width: 80px;
    height: 80px;
    display: inline-block;
}

.lds-dual-ring:after {
    display: inline-block;
    content: " ";
    width: 64px;
    height: 64px;
    margin: 8px;
    margin-top: 350px;
    border-radius: 50%;
    border: 6px solid #cef;
    border-color: #cef transparent #cef transparent;
    animation: lds-dual-ring 1.2s linear infinite;
    z-index: 999;
}

@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}</style>