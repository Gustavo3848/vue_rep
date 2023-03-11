<template>
    <div class="modal-backdrop">
        <div class="modal">
            <div class="row justify-content-md-center">
                <div class="col-md-8">
                    <div class="card mt-5">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h5>
                                        Consulta Padrão - Produtos
                                    </h5>
                                </div>
                                <div class="col text-end">
                                    <button type="button" class="btn btn-light" @click="close"><i
                                            class="bi bi-x-lg"></i></button>
                                </div>
                            </div>
                            <hr>
                            <div class="d-grid gap-1 mb-3">
                                <input type="text">
                            </div>
                            <div class="row">
                                <div class="col">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Produto</th>
                                                <th>Lote</th>
                                                <th>Quantidade</th>
                                                <th>Local</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr @dblclick="select">
                                                <td>02087</td>
                                                <td>E-285510</td>
                                                <td class="text-end">1.500,0000</td>
                                                <td>02</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row justify-content-end">
                                <div class="col-4 text-end">
                                    <button type="button" class="btn btn-light me-2" @click="close">Cancelar</button>
                                    <button type="button" class="btn btn-info">Confirmar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'consultaPadrao',
    data() {
        return {
            return:{}
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        select(){
            this.$emit('select',{
                produto:"99999",
                lote: "333333",
                quantidade: 150000,
                local: "05"
            })
            this.close()
        }
    },
}
</script>
<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: #ffffff00;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
}

.modal-header,
.modal-footer {
    padding: 15px;
    display: flex;
}

.modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
}

.modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
}

.modal-body {
    position: relative;
    padding: 20px 10px;
}

.btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
}

.btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
}
</style>