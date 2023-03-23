<template >
    <div class="row">
        <div class="col p-2">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <h1 class="card-title fs-3">ORDEM DE SERVIÇO - FA04</h1>
                        </div>
                        <div class="col text-end">
                            <button class="btn btn-info" @click="confirmar()">Confirmar</button>
                        </div>
                    </div>
                    <hr>
                    <form class="row g-3">
                        <div class="col-auto">
                            <label for="numOS" class="col-form-label">Numero OS</label>
                            <input type="texte" v-model="cab.numeroOS" class="form-control form-control-sm" id="numOS"
                                maxlength="10">
                        </div>
                        <div class="col-auto">
                            <label for="local" class="col-form-label">Local</label>
                            <div class="input-group">
                                <input type="text" v-model="cab.local" class="form-control form-control-sm"
                                    aria-describedby="button-addon2" id="local" maxlength="2">
                                <button class="btn btn-outline-info btn-sm" type="button" id="button-local"><i
                                        class="bi bi-search"></i></button>
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
    </div>
    <itensOS :emp="rowsEmp" :res="rowsRes" />
</template>
<script>
import itensOS from './itensOS.vue'
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
            },
            rowsEmp: [],
            rowsRes: [],
            totais: { qtdEmp: 0, qtdRes: 0 },
            lotes: []

        }
    },
    components: {
        itensOS
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
                },
                empenhos: this.rowsEmp,
                resultados: this.rowsRes
            }
            console.log(res)
        },
        convertDate(date) {
            let day = date.substring(8, 10);
            let month = date.substring(5, 7);
            let year = date.substring(0, 4);
            return day + "/" + month + "/" + year
        }
    }
}
</script>
<style></style>