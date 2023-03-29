<template >
    <div class="row">
        <div class="col p-2">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <h1 class="card-title fs-3">ORDEM DE SERVIÇO - {{ cFilial }}</h1>
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
    </div>
    <itensOS :emp="rowsEmp" :res="rowsRes" />
    <consultaLocais v-show="isModalVisible" @close="closeModal" @select="select" :locais="locais"></consultaLocais>
</template>
<script>
import itensOS from './itensOS.vue'
import consultaLocais from './consultaLocais.vue'
import axios from 'axios'
import { QWebChannel } from 'qwebchannel'
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
            lotes: [],
            locais: [],
            isModalVisible: false,
            cFilial: ""

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
                },
                empenhos: this.rowsEmp,
                resultados: this.rowsRes
            }
            axios.post('http://localhost:9988/app/opexecauto', res)
                .then((response) => {
                    alert("Op criada", response)
                }).catch(error => {
                    console.log(error);
                });

            console.log(res)
        },
        convertDate(date) {
            let day = date.substring(8, 10);
            let month = date.substring(5, 7);
            let year = date.substring(0, 4);
            return day + "/" + month + "/" + year
        },
        consultaLocais() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        select(payload) {
            this.cab.local = payload.local.codigo

        },
        webSocket() {
            var getParam = function (queryField) {
                var url = window.location.href;
                queryField = queryField.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig, "\\$&");

                var regex = new RegExp("[?&]" + queryField + "(=([^&#]*)|&|#|$)", "i"),
                    results = regex.exec(url);

                if (!results)
                    return null;

                if (!results[2])
                    return '';

                return decodeURIComponent(results[2].replace(/\+/g, " "));
            }

            var origin = getParam('totvstec_remote_origin');
            if ((origin === null) || (origin === '')) {
                origin = '*'
            }


            window.onmessage = function (event) {
                var data = event.data;

                if ((origin !== '*') && (event.origin !== origin)) {
                    console.log('unexpected origin', event.origin, origin);
                    return;
                }

                if ((data.type ? data.type : '').toUpperCase() !== 'MS_WEBENGINERUNJAVASCRIPT') {
                    console.log('unexpected message type');
                    return;
                }

                eval(data.value);
            }


            var twebchannel = {
                // Versao
                version: "1.0.4",

                // Porta do WebSocket
                internalPort: 0,

                // Defines do OpenSettings e TestDevice
                BLUETOOTH_FEATURE: 1,
                NFC_FEATURE: 2,
                WIFI_FEATURE: 3,
                LOCATION_FEATURE: 4,
                CONNECTED_WIFI: 5,
                CONNECTED_MOBILE: 6,

                connect: function (callback) {
                    var port = getParam('totvstec_websocket_port'),
                        remoteType = getParam('totvstec_remote_type'),
                        threadId = getParam('totvstec_threadId');

                    this.init(port, remoteType, threadId, callback);
                },

                init: function (port, remoteType, threadId, callback) {
                    this.internalPort = Number(port);
                    this.remoteType = Number(remoteType);
                    this.threadId = threadId;

                    var fireEvent = function () {
                        var event = new CustomEvent('twebchannelready');

                        document.dispatchEvent(event);

                        if (typeof callback === 'function')
                            callback();
                    };

                    if (this.remoteType !== 5) {
                        this.connectWS(fireEvent);
                    }
                    else {
                        this.connectMessageChannel(fireEvent);
                    }
                },

                jsToAdvpl: function (key, value) {
                    //console.log('not connected');

                    if (this.remoteType !== 5) {
                        window.dialog.jsToAdvpl(key, value);
                    }
                    else {
                        this.sendMessageChannel(key, value);
                    }
                },

                advplToJs: function (key, value) {
                    console.log('not connected', key, value);
                },

                // Conecta WebSocket e prepara mensageria global
                connectWS: function (callback) {
                    var baseUrl = "ws://127.0.0.1:" + this.internalPort,
                        socket = new WebSocket(baseUrl);

                    socket.onclose = function () { console.error("WebChannel closed"); };
                    socket.onerror = function (error) { console.error("WebChannel error: " + error); };
                    socket.onopen = function () {
                        new QWebChannel(socket, function (channel) {
                            window.dialog = channel.objects.mainDialog;

                            // Carrega mensageria global [CSS, JavaScript]
                            window.dialog.advplToJs.connect(twebchannel.onReceiveAdvplToJs.bind(twebchannel));

                            // Executa callback
                            if (typeof callback === 'function')
                                callback();
                        });
                    };
                },


                onReceiveAdvplToJs: function (key, value) {
                    this.advplToJs(key, value);
                },

                connectMessageChannel: function (callback) {
                    this.channel = new MessageChannel();

                    this.channel.port1.onmessage = function (event) {
                        var data = event.data,
                            messageType = (data.type || 'UNDEFINED').toUpperCase();

                        switch (messageType) {
                            case 'CONNECTED':
                                window.dialog = window.dialog || {};
                                window.dialog.jsToAdvpl = twebchannel.sendMessageChannel.bind(twebchannel);

                                if (typeof callback === 'function')
                                    callback();

                                //this.queue.setMaxPendingPromises(1);

                                break;
                            case 'DISCONNECTED':
                                console.log("received a DISCONNECTED message.", event);

                                break;
                            case 'EXEC':
                                twebchannel.onReceiveAdvplToJs(
                                    data.value.type,
                                    data.value.content
                                );

                                break;
                            case 'RETURN':
                                //console.log("received a RETURN message.", event);

                                break;
                            default:
                                console.error("invalid message: " + messageType, event);

                                break;
                        }
                    };

                    window.parent.postMessage({
                        type: 'CONNECT',
                        port: this.internalPort,
                        threadId: this.threadId
                    }, origin, [this.channel.port2]);
                },

                sendMessageChannel: function (key, value) {
                    var message = {
                        type: key,
                        content: value,
                        port: this.internalPort
                    };

                    this.channel.port1.postMessage(message);
                }

            };
            // Fecha conexao entre o AdvPL e o JavaScript via WebSocket
            twebchannel.connect(() => { console.log('Websocket Connected!'); });
            twebchannel.advplToJs = function (key, value) {
                // ----------------------------------------------------------
                // Insira aqui o tratamento para as mensagens vindas do AdvPL
                // ----------------------------------------------------------
                if (key === "<script>") {
                    console.log(value)
                }
            }
        }
    },
    mounted() {
        axios.get('http://localhost:9988/app/locais/FA04')
            .then((response) => {
                this.locais = response.data.data
            }).catch(error => {
                console.log(error);
            });
        this.webSocket()
    }

}
</script>
<style></style>