<template >
    <div class="row">
        <div class="col p-2">
            <div class="card">
                <div class="card-body">
                    <h1 class="card-title fs-3">ORDEM DE SERVIÇO - FA04</h1>
                    <hr>
                    <form class="row g-3">
                        <div class="col-auto">
                            <label for="numOP" class="col-form-label">Numero da OP</label>
                            <input type="text" readonly class="form-control-plaintext form-control-sm" id="numOP"
                                value="00122501001" disabled>
                        </div>
                        <div class="col-auto">
                            <label for="numOS" class="col-form-label">Numero OS</label>
                            <input type="texte" class="form-control form-control-sm" id="numOS" maxlength="10">
                        </div>
                        <div class="col-auto">
                            <label for="local" class="col-form-label">Local</label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm" aria-describedby="button-addon2" id="local" maxlength="2">
                                <button class="btn btn-outline-info btn-sm" type="button" id="button-local"><i class="bi bi-search"></i></button>
                            </div>
                        </div>
                        <div class="col-auto">
                            <label for="dtEmissao" class="col-form-label">Dt Emissão</label>
                            <input type="date" class="form-control form-control-sm" id="dtEmissao">
                        </div>
                        <div class="col-auto">
                            <label for="prevIni" class="col-form-label">Previsão Ini</label>
                            <input type="date" class="form-control form-control-sm" id="prevIni">
                        </div>
                        <div class="col-auto">
                            <label for="entrega" class="col-form-label">Entrega</label>
                            <input type="date" class="form-control form-control-sm" id="entrega">
                        </div>
                        <div class="col-auto">
                            <label for="observacao" class="col-form-label">Observação</label>
                            <input type="texte" class="form-control form-control-sm" id="observacao"  maxlength="254">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
   <itensOS/>
</template>
<script>
import itensOS from './itensOS.vue'
export default {
    name: 'cabOS',
    components:{
        itensOS
    }
}
</script>
<style></style>