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
                                <input type="text" class="form-control" v-model="search">
                            </div>
                            <div class="row">
                                <div class="col">
                                    <table class="table table-sm scrolldown">
                                        <thead>
                                            <tr>
                                                <th>Produto</th>
                                                <th>Lote</th>
                                                <th>Quantidade</th>
                                                <th class="text-center">Local</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr @dblclick="select(lote)" v-for="(lote) in filteredData"
                                                :key="lote.lote + lote.produto">
                                                <td>{{ lote.produto }}</td>
                                                <td>{{ lote.lote }}</td>
                                                <td class="text-end">{{ $filters.sldFilter(lote.saldo) }}</td>
                                                <td class="text-center">{{ lote.local }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row justify-content-end">
                                <div class="col-4 text-end">
                                    <button type="button" class="btn btn-light me-2" @click="close">Cancelar</button>
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
import {computed,ref } from 'vue';
export default {
    name: 'consultaPadrao',
    props: ["lotes"],
    data() {
        return {
            return: {

                itens: this.lotes
            }
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        select(lote) {
            this.$emit('select', {
                produto: lote.produto,
                lote: lote.lote,
                quantidade: lote.saldo,
                local: lote.local
            })
            this.close()
        }
    },
    setup(props) {
        const search = ref('')
        const filteredData = computed(() => {
            return props.lotes.filter(item => {
                return item.lote.toLowerCase().includes(search.value.toLowerCase()) || item.produto.toLowerCase().includes(search.value.toLowerCase()) ;
            });
        });
        return {
            search,
            filteredData
        };
    }

}
</script>
<style scoped>
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


table.scrolldown {
    width: 100%;

    /* border-collapse: collapse; */
    border-spacing: 0;
}

/* To display the block as level element */
table.scrolldown tbody,
table.scrolldown thead {
    display: block;
}

table.scrolldown tbody {

    /* Set the height of table body */
    height: 250px;

    /* Set vertical scroll */
    overflow-y: 15px;

    /* Hide the horizontal scroll */
    overflow-x: hidden;
}


tbody td,
thead th {
    width: 20rem;
}
</style>