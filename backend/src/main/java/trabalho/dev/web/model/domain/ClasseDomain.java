package trabalho.dev.web.model.domain;

import jakarta.persistence.*;

import java.util.Date;

@Entity(name = "Classe")
public class ClasseDomain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @Column(nullable = false, length = 40)
    private String nome;

    @Column(nullable = false)
    private double valor;

    @Column(nullable = false)
    private Date data;



    public ClasseDomain(String nome) {
        this.nome = nome;
    }

    public ClasseDomain(String nome, Long id) {
        this.nome = nome;
        this.id = id;
    }

    public ClasseDomain(String nome, double valor, Date data) {
        this.nome = nome;
        this.valor = valor;
        this.data = data;
    }

    public ClasseDomain(String nome, Long id, Date data, double valor) {
        this.nome = nome;
        this.id = id;
        this.data = data;
        this.valor = valor;
    }

    public ClasseDomain() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }
}
